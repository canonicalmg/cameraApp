from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.signUpLogIn, name='signUp'),
    url(r'^home$', views.home, name='home'),
    url(r'^getQuestions$', views.getQuestions, name='getQuestions'),
    url(r'^sendNewEntry$', views.sendNewEntry, name='sendNewEntry')
]