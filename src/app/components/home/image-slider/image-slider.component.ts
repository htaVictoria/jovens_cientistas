import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ImageSlide {
  url: string;
  urlMobile: string;
}

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  private autoplayInterval: any = null;
  private isAutoplayPaused = false;
  private isDestroyed = false;

  images: ImageSlide[] = [
    {
      url: 'assets/slides/img1_desktop.png',
      urlMobile: 'assets/slides/img1_mobile.png',
    },
    {
      url: 'assets/slides/img2_desktop.png',
      urlMobile: 'assets/slides/img2_mobile.png',
    },

  ];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.isDestroyed = false;
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.stopAutoplay();
  }

  get slideTransform(): number {
    return -this.currentIndex * 100;
  }

  startAutoplay(): void {
    if (this.isDestroyed) return;
    
    this.stopAutoplay();
    
    this.ngZone.runOutsideAngular(() => {
      this.autoplayInterval = setInterval(() => {
        if (!this.isAutoplayPaused && !this.isDestroyed) {
          this.ngZone.run(() => {
            this.goToNext();
          });
        }
      }, 5000);
    });
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  pauseAutoplay(): void {
    this.isAutoplayPaused = true;
  }

  resumeAutoplay(): void {
    this.isAutoplayPaused = false;
  }

  goToPrevious(): void {
    this.currentIndex = this.currentIndex === 0 
      ? this.images.length - 1 
      : this.currentIndex - 1;
  }

  goToNext(): void {
    this.currentIndex = this.currentIndex === this.images.length - 1 
      ? 0 
      : this.currentIndex + 1;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }
}