from django.urls import path 
from .views import user_api,user_api_logout


urlpatterns = [
    path('me/',user_api,name='user_api'),
    path('me/logout/',user_api_logout,name='user_api_logout'),
]
