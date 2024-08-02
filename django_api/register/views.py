from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import login
import json

# Create your views here.


@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            first_name=data.get('first_name')
            last_name=data.get('last_name')
            email=data.get('email')
            username=data.get('username')
            password=data.get('password')
            confirmPassword=data.get('confirmPassword')
            if User.objects.filter(username=username).exists():
                return JsonResponse({'message':'Username is already used'},status=403)
            elif User.objects.filter(email=email).exists():
                return JsonResponse({'message':'Email is already used'},status=403)
            elif password != confirmPassword:
                return JsonResponse({'message': 'Your password not match'}, status=400)
            elif not (first_name and last_name and email and username and password and confirmPassword):
                return JsonResponse({'message': 'Please check your inputs'}, status=400)
            elif (first_name and last_name and email and username and password and confirmPassword):
                user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                username=username,
                email=email,
                )
                user.set_password(password)
                user.save()
                login(request,user)
                return JsonResponse({'message':'User has been created'},status=201)
            else:
                return JsonResponse({'message': 'Please check your inputs'}, status=400)                    
        except:
            return JsonResponse({'message': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'message':'Method not allowed'},status=405)