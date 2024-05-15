from django.db import models

# Create your models here.

class Relationship(models.Model):
    follower = models.ForeignKey('Authentication_App.User', on_delete=models.CASCADE, related_name='following')
    followed = models.ForeignKey('Authentication_App.User', on_delete=models.CASCADE, related_name='followers')

    def __str__(self):
        return f'{self.follower.username} follows {self.followed.username}'
