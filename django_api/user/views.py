from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
import json




@csrf_exempt
@api_view(['GET','PUT','DELETE'])
@authentication_classes([TokenAuthentication])
def user_api(request):
        user = request.user
        if request.method == 'GET':
            user = request.user
            if user.is_authenticated:
                    isAdmin = user.is_superuser
                    print(isAdmin)
                    return JsonResponse({'first_name':user.first_name,'last_name':user.last_name,'username': user.username,'email': user.email,'isAdmin':isAdmin}, status=200)
            else:
                return JsonResponse({'message': 'hi'}, status=200)
        elif request.method == 'PUT':
            data = json.loads(request.body)
            first_name=data.get('first_name')
            last_name=data.get('last_name')
            email=data.get('email')
            username=data.get('username')
            password=data.get('password')
            new_password=data.get('new_password')
            confirm_new_password=data.get('confirm_new_password')
            get_user = User.objects.filter(id=user.id).first()
            pass_status = get_user.check_password(password)
            if user.is_authenticated:
                if pass_status and first_name and last_name and email and username and password and not new_password or not confirm_new_password:
                    get_user.first_name=first_name
                    get_user.last_name=last_name
                    get_user.email=email
                    get_user.username=username
                    get_user.save()
                    return JsonResponse({'message':'User has been updated'}, status=200)
                elif pass_status and first_name and last_name and email and username and password and new_password and new_password == confirm_new_password:
                    get_user.first_name=first_name
                    get_user.last_name=last_name
                    get_user.email=email
                    get_user.username=username
                    get_user.set_password(new_password)
                    get_user.save()
                    return JsonResponse({'message':'User has been updated'}, status=200)
                elif not pass_status:
                    return JsonResponse({'message': 'Wrong user name or password'}, status=400)
                else:
                    return JsonResponse({'message': 'Please check your inputs'}, status=400)
            else:
                return JsonResponse({'message': 'Unauthorized'}, status=401)
        elif request.method == 'DELETE':
                get_user = User.objects.filter(id=user.id).first()
                pass_status = get_user.check_password(password)
                if pass_status and password:
                    get_user.delete()
                    return JsonResponse({'message':'User has been deleted'}, status=200)
                elif not pass_status:
                    return JsonResponse({'message': 'Wrong user name or password'}, status=400)
                else:
                    return JsonResponse({'message': 'Please check your inputs'}, status=400)
        else:
            return JsonResponse({'message': 'Unauthorized'}, status=401)


@csrf_exempt
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def user_api_logout(request):
    user = request.user
    Token.objects.filter(user=user).delete()
    return JsonResponse({'message':'Logout successfully'}, status=200)