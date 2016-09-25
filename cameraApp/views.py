from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.contrib.auth.models import User
#from .models import profile, profilePhotos, profilePrimaryPic, wallPost, postComment, postLike
from .models import question
from django.contrib.auth import authenticate,login, logout
from django.core import serializers
import json

def signUpLogIn(request):
    if request.user.is_authenticated():
        #send them to /home
        return HttpResponseRedirect("home")
    else:
        template = loader.get_template('headerLogin.html')
        return HttpResponse(template.render({}, request))


def home(request):
    if request.user.is_authenticated():
        template = loader.get_template('home.html')
        return HttpResponse(template.render({}, request))
    else:
        #login
        return HttpResponseRedirect("/")

def headerSignIn(request):
    print "entered"
    if request.is_ajax():
        if request.method == "POST":
            data = request.POST.getlist("data[]")
            user = authenticate(username=str(data[0]), password=str(data[1]))
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponse("return this string")
            else:
                return HttpResponse("Does not match")

def headerSignOut(request):
    logout(request)
    if request.is_ajax():
        return HttpResponse("return this string")
    else:
        return HttpResponseRedirect("/")

def getQuestions(request):
    if request.is_ajax():
        if request.method == "GET":
            leads_as_json = serializers.serialize('json', question.objects.all())
            return HttpResponse(leads_as_json, content_type='json')

def sendNewEntry(request):
    if request.is_ajax():
        if request.method == "POST":
            data = request.POST.getlist("data[]")
            print data
            print "entered ", data
            return HttpResponse("return this string")

