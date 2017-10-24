import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';

import { UploadFileService } from '../upload-file/shared/upload.service';
import { SizeConvectorService } from '../upload-file/shared/size-convector.service';
import { Upload } from '../upload-file/shared/upload';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  uploads: Observable<Upload[]>;
  showSpinner = true;
  totalSize: any = 0;
  totalFiles: any;
  audio: any = {
    size: 0
  }
  video: any = {
    size: 0
  }
  photo: any = {
    size: 0
  }
  freeSpace: any;

  constructor(
    private uploadFileService: UploadFileService,
    private sizeConvectorService: SizeConvectorService
  ) { }

  // Doughnut
  public doughnutChartLabels: Array<any> = ["Audio", "Free space", "Video", "Photo"];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartColors: Array<any> = [{}];
  public doughnutChartData: any;
  public datasets: any[] = [
    {
      data: [0, 100, 0, 0],
      backgroundColor: [
        "#0066d1",
        "#00051a",
        "#004995",
        "#c6cdd5"
      ],
      hoverBackgroundColor: [
        "#0066d1",
        "#00051a",
        "#004995",
        "#c6cdd5"
      ],
      borderColor: ["#fff", "#fff", "#fff", "#fff"],

    }];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    this.uploads = this.uploadFileService.getUploads();

    this.uploads.subscribe((value) => {
      let audioFile = value.filter((file) => {
        return file.type.indexOf('audio') !== -1;
      })
      audioFile.forEach(element => {
        this.audio.size = this.audio.size + element.size;
      });
      
      let videoFile = value.filter((file) => {
        return file.type.indexOf('video') !== -1;
      })
      videoFile.forEach(element => {
        this.video.size = this.video.size + element.size;
      });

      let photoFile = value.filter((file) => {
        return file.type.indexOf('image') !== -1;
      })
      photoFile.forEach(element => {
        this.photo.size = this.photo.size + element.size;
      });

      //Total free space == 150MB
      this.freeSpace = 157286400 - this.audio.size - this.video.size - this.photo.size;

      this.doughnutChartData = [this.audio.size, this.freeSpace, this.video.size, this.photo.size];

      this.showSpinner = false;
      
      Chart.pluginService.register({
        afterUpdate: function (chart) {
          function sizeConvector(bytes: any){
            if (bytes == 0) return '0 Bytes';
            var k = 1024,
              dm = 0,
              sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
              i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
          }

          // Count and convert total files size
          this.totalSize=0;
          for (let i=0; i < value.length; i++){
            this.totalSize = this.totalSize + value[i].size;
          }

          this.totalFiles = value.length === 1 ? "1 file" : value.length + " files";
          this.totalSize = sizeConvector(this.totalSize);
          // if (this.totalSize == 0) return '0 Bytes';
          // var k = 1024,
          //   dm = 0,
          //   sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          //   i = Math.floor(Math.log(this.totalSize) / Math.log(k));
          // this.totalSize = parseFloat((this.totalSize / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
          // this.totalFiles = value.length === 1 ? "1 file" : value.length + " files";

          // Text in the center set-up
          chart.config.options.elements.center = {
            "text": this.totalSize,
            "textNumber": this.totalFiles
          };

          if (chart.config.options.elements.center) {
            var helpers = Chart.helpers;
            var centerConfig = chart.config.options.elements.center;
            var globalConfig = Chart.defaults.global;
            var ctx = chart.chart.ctx;
  
            var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
            var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);
  
            if (centerConfig.fontSize)
              var fontSize = centerConfig.fontSize;
            // figure out the best font size, if one is not specified
            else {
              ctx.save();
              var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
              var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
              var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);
  
              do {
                ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
                var textWidth = ctx.measureText(maxText).width;
                // check if it fits, is within configured limits and that we are not simply toggling back and forth
                if (textWidth < chart.innerRadius / 1.2 && fontSize < maxFontSize)
                  fontSize += 1;
                else {
                  // reverse last step
                  fontSize -= 1;
                  break;
                }
              } while (true)
              ctx.restore();
            }
  
            // save properties
            chart.center = {
              font: helpers.fontString(fontSize, fontStyle, fontFamily),
              fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
            };
          }
        },
        afterDraw: function (chart) {
          if (chart.center) {
            const centerConfig = chart.config.options.elements.center;
            const ctx = chart.chart.ctx;
            ctx.save();
            ctx.font = chart.center.font;
            ctx.fillStyle = chart.center.fillStyle;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const centerXnumb = (chart.chartArea.left + chart.chartArea.right) / 2;
            const centerYnumb = (chart.chartArea.top + chart.chartArea.bottom) / 2.2;
            ctx.fillText(centerConfig.textNumber, centerXnumb, centerYnumb);
            ctx.save();
  
            var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 1.8;
            ctx.fillText(centerConfig.text, centerX, centerY);
            ctx.restore();
          }
        }
      })

    })

  }



}
