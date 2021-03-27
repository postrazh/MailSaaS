from datetime import datetime, timezone, timedelta
import math
import random
from celery import shared_task
from .models import *
from .utils import *
from ..campaign.models import SendingObject

default_rampup_increment = 3
default_max_warmup_cnt = 20

@shared_task(bind=True)
def test_email(self, mailAccountId):
    mailAccount = EmailAccount.objects.get(pk=mailAccountId)
    print('Sending email from :', mailAccount)

    send_mail_with_smtp(host=mailAccount.smtp_host,
                        port=mailAccount.smtp_port,
                        username=mailAccount.smtp_username,
                        password=mailAccount.smtp_password,
                        use_tls=mailAccount.use_smtp_ssl,
                        from_email=mailAccount.email,
                        to_email=['valor312@gmail.com'],
                        subject="This is test email",
                        body="Hi, this email is sent by SMTP.")


@shared_task
def email_sender():
    print('Email sender is called...')

    LIMIT = 10

    available_mail_ids = []
    mail_accounts = EmailAccount.objects.all()
    for mail_account in mail_accounts:
        sending_calendar, created = SendingCalendar.objects.get_or_create(mail_account_id=mail_account.id)
        if created:
            sending_calendar = SendingCalendar.objects.get(mail_account_id=mail_account.id)
        calendar_status, created = CalendarStatus.objects.get_or_create(sending_calendar_id=sending_calendar.id,
                                                                        defaults={'updated_datetime': datetime.now(
                                                                            timezone.utc) - timedelta(days=1)})

        can_send = True
        # Check time

        current_time = datetime.now().time()
        if sending_calendar.start_time > current_time:
            can_send = False
        if current_time > sending_calendar.end_time:
            can_send = False

        weekday = datetime.today().weekday()
        if sending_calendar.block_days & weekday:
            can_send = False

        # Check max email count per day
        if calendar_status.sent_count >= sending_calendar.max_emails_per_day:
            can_send = False

        minutes = (datetime.now(timezone.utc) - calendar_status.updated_datetime).total_seconds() / 60.0
        if minutes < sending_calendar.minutes_between_sends:
            can_send = False

        if can_send:
            available_mail_ids.append(mail_account.id)

    # Fetch sending objects
    sending_objects = SendingObject.objects.filter(status=0, from_email_id__in=available_mail_ids).order_by(
        "email_type")[:LIMIT]

    for sending_item in sending_objects:
        mail_account = sending_item.from_email

        # Send email
        result = send_mail_with_smtp(host=mail_account.smtp_host,
                                     port=mail_account.smtp_port,
                                     username=mail_account.smtp_username,
                                     password=mail_account.smtp_password,
                                     use_tls=mail_account.use_smtp_ssl,
                                     from_email=mail_account.email,
                                     to_email=[sending_item.recipient_email],
                                     subject=sending_item.email_subject,
                                     body=sending_item.email_body)

        if result:
            print(f"Email sent from {mail_account.email} to {sending_item.recipient_email}")

            # Update CalendarStatus
            #   reset the today's count
            if calendar_status.updated_datetime.date() != datetime.today().date():
                calendar_status.sent_count = 0
            #   increase the sent count
            calendar_status.sent_count += 1
            #   update the timestamp
            calendar_status.updated_datetime = datetime.now(timezone.utc)
            #   save
            calendar_status.save()

            # Update SendingObjects
            sending_item.status = 1
            sending_item.sent_date = datetime.now().date()
            sending_item.sent_time = datetime.now().time()
            sending_item.save()
        else:
            print(f"Failed to send from {mail_account.email} to {sending_item.recipient_email}")


@shared_task
def warming_trigger():
    print("warming_sender triggered")
    return
    # Get warming enabled accounts
    enabledAccounts = WarmingStatus.objects.filter(warming_enabled=True).select_related("mail_account")
    for item in enabledAccounts:
        mail_account = item.mail_account
        cnt_to_send = min(default_rampup_increment * item.days_passed, default_max_warmup_cnt)

        # calculate time span for today's warmup emails
        timespan = math.floor(20 * 60 / cnt_to_send)            # time interval between 2 adjacent mails; notice the total time range is 20 hours
        timespan += random.randint(-10, 10)

        logs = WarmingLog.objects.filter(mail_account_id=mail_account.id, sent_at__day=datetime.today().day).order_by('-sent_at')

        # if it exceeded today's count, continue
        if len(logs) >= cnt_to_send:
            continue

        if len(logs) > 0:
            timediff_minutes = (datetime.today() - logs[0].sent_at) / 60
            # if it's too soon to send warm email, continue
            if (timediff_minutes < timespan):
                continue

        # get random Warming account to sent out email
        account_list = [tmp for tmp in enabledAccounts if tmp.mail_account_id != mail_account.id ]
        dest_account = random.choice(account_list)

        # send email to dest_account

        # log in the DB
        WarmingLog.objects.create(mail_account_id=mail_account.id)
