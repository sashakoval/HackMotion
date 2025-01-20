import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-coaching-section',
  templateUrl: './coaching-section.component.html',
  styleUrls: ['./coaching-section.component.scss']
})
export class CoachingSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @Output() videoEnded = new EventEmitter<void>();
  
  private videoElement!: HTMLVideoElement;
  private videoTimeUpdateListener!: EventListener;
  private videoEndedListener!: EventListener;

  public isPlayButtonEnabled: boolean = true;
  public progress = 0;
  public videoTime = 0;
  
  public timestamps = [
    { time: 5, label: 'Static Top Drill', content: 'Get a feel for the optimal wrist position at Top of your swing' },
    { time: 14, label: 'Dynamic Top Drill', content: 'Dynamically train your wrist position at Top' },
    { time: 24, label: 'Top Full Swing Challenge', content: 'Train your maximum power swing' }
  ];

  public ngAfterViewInit() {
    if (this.videoPlayer) {
      this.videoElement = this.videoPlayer.nativeElement;

      this.videoElement.muted = true;
      this.videoElement.autoplay = true;

      this.videoTimeUpdateListener = () => this.onTimeUpdate();
      this.videoEndedListener = () => this.videoEnded.emit();

      this.videoElement.addEventListener('timeupdate', this.videoTimeUpdateListener);
      this.videoElement.addEventListener('ended', this.videoEndedListener);
    }
  }

  public ngOnDestroy(): void {
    if (this.videoElement) {
      this.videoElement.removeEventListener('timeupdate', this.videoTimeUpdateListener);
      this.videoElement.removeEventListener('ended', this.videoEndedListener);
    }
  }

  public jumpToTimestamp(timestamp: { time: number; label: string }) {
    if (this.videoElement) {
      this.videoElement.currentTime = timestamp.time;
      this.videoElement.play();
    }
  }

  public updateProgress(event: any) {
    const duration = this.videoPlayer.nativeElement.duration;
  
    this.progress = event.target.value;
  
    const newTime = (this.progress / 100) * duration;
    
    this.videoPlayer.nativeElement.currentTime = newTime;

    this.videoElement.play();
  }

  public onTimeUpdate() {
    if (this.videoElement) {
      const currentTime = this.videoElement.currentTime;
      const duration = this.videoElement.duration;

      this.progress = (currentTime / duration) * 100;

      this.videoTime = currentTime;
    }
  }

  public isTimestampDescriptionVisible(index: number): boolean {
    if (!this.videoElement || index < 0 || index >= this.timestamps.length) {
      return false;
    }

    const currentTime = this.videoElement.currentTime;
    const currentTimestamp = this.timestamps[index];
    const nextTimestamp = this.timestamps[index + 1];

    return nextTimestamp 
      ? currentTime >= currentTimestamp.time && currentTime < nextTimestamp.time 
      : currentTime >= currentTimestamp.time;
  }
}
