from django.db import models

# Create your models here.


class Picture(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='pictures/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('Authentication_App.User', on_delete=models.CASCADE, related_name='pictures')
    likes = models.IntegerField(default=0) 

    def __str__(self):
        return self.title
