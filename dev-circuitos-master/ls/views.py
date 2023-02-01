from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render

import os
#import base64
import re
#from PIL import Image
#import imageio
#import numpy as np
from moviepy.editor import concatenate_videoclips
from moviepy.editor import VideoFileClip
import time
from django.http import StreamingHttpResponse
#import multiprocessing
#from moviepy.config import set_setting
#set_setting("IMAGEMAGICK_BINARY", "path/to/ffmpeg")


#from moviepy.video.io import gif_writer #ME DIO PROBLEMAS AL MOMENTO DE IMPORTAR gif_writer''

# import moviepy.video.io.gif_writer
# Create your views here.
def index(request):
  return render(request,'index.html')





# def gif(request,param):
def gif(request, param):
  
  gif_paths = []

  lista_palabras = re.split("[,._?¡!¿ ]", param)
  lista_palabras = list(filter(lambda word: word.strip(), lista_palabras))
  #print(lista_palabras)
  #HASTA AQUI TENGO MI LISTA CON LOS NOMBRE DE LOS GIFS EN LISTA DE PALABRAS
  #VOY AGREGAR LA EXTENSION .GIF EN LA SIGUIENTE LINNEA
  gif_list_ext = [gif + '.gif' for gif in lista_palabras]
  #print(gif_list_ext)
  start = time.time()
  for palabra in gif_list_ext:
    # base_dir = os.path.dirname(os.path.abspath(__file__))
    # static_dir = os.path.join(base_dir, '..', 'static')
    # img_dir = os.path.join(static_dir, 'img')
    
    # gif_path = os.path.join(img_dir, f'{palabra}')
    # ruta_normalizada = gif_path.replace('\..', '')
    # print("NORMALIZADA",ruta_normalizada)
    # gif_paths.append(ruta_normalizada)
    img_dir = "C:/Users/nicolas/OneDrive/Escritorio/dev-circuitos-master/ls/static/img/"+palabra
    gif_paths.append(img_dir)


  print("ESTOY AQUI ")
  # #### ESTO ES LO QUE FUNCIONA
  # start = time.time()
  # clips = [VideoFileClip(path) for path in gif_paths]
  # final_clip = concatenate_videoclips(clips)
  # final_clip.write_gif("final_gif.gif", fps=7)
  # #final_clip.write_videofile("final_gif.mp4", fps=7)
  # #final_clip.write_images_sequence("final_gif.gif", fps=7)

  # response = HttpResponse(content_type="image/gif")
  # with open("final_gif.gif", "rb") as f:
  #   response.write(f.read())
  # final = time.time()
  # print(final - start)
  # return response

#############---------------------

  ### DE AQUI PARA ABAJO ESTOY EXPERIMENTANDO PARA MEJORAR EL TIEMPO DE RESPUESTA
  #1.PRIMA PRUEBA LE REDUCI LA RESOLUCION PERO NO ES BENEFICIOSO YA QUE SI LA  PANTALLA VARIA DE TAMAÑO NO SE PUEDE APRECIAR EL VIDEO
  #clips = [VideoFileClip(path).resize(height=50) for path in gif_paths]


  
  clips = [VideoFileClip(path) for path in gif_paths]  # .margin(top=0, bottom=0, left=0, right=0) .resize(height=260)
  print(clips)
  final_clip = concatenate_videoclips(clips)
  print(final_clip)
  final_clip.write_videofile(
      "final_gif.mp4", codec="mpeg4", fps=7, bitrate="5000k")  # codec="mpeg4",libx264, preset='ultrafast','medium','fast'

  #response = HttpResponse(content_type="video/mp4")
  #with open("final_gif.mp4", "rb") as f:
  #  response.write(f.read())
  with open("final_gif.mp4", "rb") as f:
        response = StreamingHttpResponse(streaming_content=(chunk for chunk in f.read(4096)), content_type="video/mp4")
  final = time.time()
  print(final - start)
  return response
