from django.urls import path, include
from . import views
from django.contrib import admin

from django.urls import path
from . import views




urlpatterns = [
    path('save_image/', views.save_image, name='save_image'),
    path('login/', views.check_username, name='check_username'),
    path('home/', views.home, name='home'),
    path('add_item/', views.add_item, name='add_item'),
    path('authorize/',  views.index, name='authorize'),
    path('verify/', views.verify, name='verify'),
    path('email/', views.send_email, name='email'),
    path('', views.pic, name='get_pic')
    
]












# urls.py in your Django project

# admin.site.site_header = 'Flight Booking Admin'
