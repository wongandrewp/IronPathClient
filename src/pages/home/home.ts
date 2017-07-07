import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { Transfer, TransferObject, FileUploadResult } from '@ionic-native/transfer';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MediaCapture, VideoPlayer, StreamingMedia, Transfer]
})
export class HomePage {
  private videoOptions : VideoOptions
  public path: any
  private file_transfer: TransferObject = this.transfer.create();

  constructor(
    public navCtrl: NavController,
    private mediaCapture: MediaCapture,
    private videoPlayer: VideoPlayer,
    private streamingMedia : StreamingMedia,
    private transfer: Transfer,) 
    {}
  upload(){
    // Destination URL
  var url = "http://192.168.1.126:8080/files/upload";

  // File for Upload
  var targetPath = this.path;

  // File name only
  var filename = this.path.split('/').pop();

  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };

  const fileTransfer = new Transfer();

  // this.loading = this.loadingCtrl.create({
  //   content: 'Uploading...',
  // });
  // this.loading.present();

  // Use the FileTransfer to upload the image
  this.file_transfer.upload(targetPath, url, options).then(data => {
    alert('Image succesful uploaded.');
  }, err => {
    alert('Error while uploading file. ' + JSON.stringify(err));
  });
  }
  captureSuccess(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        this.path = mediaFiles[i].fullPath;
    }
  };
  recordVideo(){
    let options: CaptureVideoOptions = { limit: 1 };
    this.mediaCapture.captureVideo(options)
    .then(
    (data: MediaFile[]) => this.captureSuccess(data),
    (err: CaptureError) => alert("Error" + err)
    );
  }
  playVideo(){
    // this.videoOptions = { volume : 1.0 }
    // this.videoPlayer.play("http://192.168.1.126:8080/files/ball_tracking_example.mp4").then(() => {
    // alert("Video Completed")
    // }).catch(err => {
    // alert("Video error: " + JSON.stringify(err));
    // });
    var options = {
      successCallback: function() {
		  alert("Video was closed without error.");
		},
		errorCallback: function(errMsg) {
		  alert("Error! " + errMsg);
		},
		orientation: 'landscape'
		}
    this.streamingMedia.playVideo("http://192.168.1.126:8080/files/ball_tracking_example.mp4", options);
  }
  
}
