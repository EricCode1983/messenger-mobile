import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input()TABS: any;
  @Output() selectedTab = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  setActiveTab(index) {
    this.TABS.forEach(tab => {
      tab.active = false;
    });
    this.TABS[index].active = true;

    const div = document.querySelector(`.item_${index}`);
    div.scrollIntoView({ behavior: 'smooth' });

    // emit selected tab
    this.selectedTab.emit(this.TABS[index]);
  }

}
