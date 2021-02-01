from django.urls import path
from . import views
# from .routers import router


urlpatterns = [
    # url('^$', views.index),
    # url('slack/oauth/', views.SocialLoginView.as_view()),
    path('sforcepage/', views.ContactViewSet.as_view()),
    path('event/hook/', views.event_hook, name='event_hook'),
]
