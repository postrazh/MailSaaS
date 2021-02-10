import csv
import io

from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import Http404, HttpResponse, JsonResponse, request
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions, serializers, status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UnsubcribeCsv, UnsubscribeEmail
from .serializers import UnsubscribeEmailSerializers


class UnsubscribeEmailAdd(CreateAPIView):
    serializer_class = UnsubscribeEmailSerializers
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self,request):
        postdata = request.data
        print("request.data", postdata)
        for email in postdata["email"]:
            data = {
                "email" : email,
                "name" : postdata["name"],
                'user':request.user.id
            }
            serializer = UnsubscribeEmailSerializers(data=data)
        if serializer.is_valid():
            print("Valid")
            
            serializer.save()
            return Response({"message":"Unsubcribe Successfully done","success":True})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


            
   
class UnsubcribeCsvEmailAdd(CreateAPIView):

    permission_classes = (permissions.IsAuthenticated,)

    def post(self,request):
        csv_file = request.data['csv_file']
        csv_obj = UnsubcribeCsv(unscribe_emails=csv_file)
        csv_obj.save()
        with open('media/'+str(csv_obj.unscribe_emails)) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            line_count = 0
            resp = []
            for row in csv_reader:
                if line_count == 0:
                    pass
                else:
                    data = {'email':row[0], 'name':row[1],'user':request.user.id}
                    serializer = UnsubscribeEmailSerializers(data = data)
                    if serializer.is_valid():
                        line_count += 1
                        serializer.save()
                        resp.append(serializer.data)
            resp.append({"success":True})
            return Response(resp)


class UnsubcribeEmailView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UnsubscribeEmailSerializers
    def get(self,request):
        params = list(dict(request.GET).keys())
        if "search" in params:
            toSearch = request.GET['search']
            unsubcribe = UnsubscribeEmail.objects.filter(Q(email__contains=toSearch)|Q(name__contains=toSearch),user=request.user.id,on_delete=False)
        else:
            unsubcribe = UnsubscribeEmail.objects.filter(user=request.user.id,on_delete=False)
        serializer=UnsubscribeEmailSerializers(unsubcribe, many=True)
        return Response(serializer.data)


class UnsubcribeEmailDelete(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UnsubscribeEmailSerializers      
    def put(self, request, format=None):
        data =request.data["data"]
        for id in data:
            print('id',id)
            unsubcribe = UnsubscribeEmail.objects.get(id = id)
            
            unsubcribe.on_delete=True
            unsubcribe.save()
        return Response("Unsubcribe Recipient Successfully Done ")
       