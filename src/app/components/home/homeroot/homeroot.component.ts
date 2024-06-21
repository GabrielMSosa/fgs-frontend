import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuLateral } from '../../../interfaces/IMenuLateral';

@Component({
  selector: 'app-homeroot',
  templateUrl: './homeroot.component.html',
  styleUrl: './homeroot.component.css'
})
export class HomerootComponent {
  Menu: IMenuLateral[] = [
    {
      icon: "dashboard",
      title: "Dashboard",
      router_link: "/home/preview",
      isSubMenu: false,
      submenu: [
        {
          have_icon:false,
          title: "",
          icon: "",
          router_link: ""
        }
      ]
    },
    {
      icon: "Mobile Phone",
      title: "",
      router_link: "",
      isSubMenu: true,
      submenu: [
        {have_icon:true,
          title: "iOS",
          icon: "apple",
          router_link: "#"
        },
        {
          have_icon:true,
          title: "Android",
          icon: "android",
          router_link: "#"
        }
      ]
    },
    {
      icon: "Frameworks",
      title: "",
      router_link: "",
      isSubMenu: true,
      submenu: [
        {
          have_icon:false,
          title: "Spring",
          icon: "",
          router_link: "#"
        },
        {
          have_icon:false,
          title: "Hibernate",
          icon: "",
          router_link: "#"
        },
        {
          have_icon:false,
          title: "Struts",
          icon: "",
          router_link: "#"
        }
      ]
    }

  ]


  constructor(private Routes: Router) { }






}
