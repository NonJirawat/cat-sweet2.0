import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = false; // ตัวแปรเพื่อควบคุมการย่อ/ขยายของ Sidebar
  selectedMenu = 'home'; // ตัวแปรสำหรับแสดงเมนูที่เลือก

  // ฟังก์ชันเปิด/ปิด Sidebar
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  // ฟังก์ชันสำหรับเลือกเมนู
  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }
}
