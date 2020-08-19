import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import imageData from '../../models/elements.json';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  dataSet:any;
  searches: string="";

  constructor(private http: DataService) { }
  ngOnInit() {
    this.dataSet = this.http.datas;
    this.http.getLikedItems();
    this.getFirst();
  }
  getFirst(){
    setTimeout(()=>{
      const btn = document.querySelectorAll('.btn-success');

      for(const items of this.http.getLikedItems()){
        console.log(btn[items]);
        btn[items].classList.add('like');
      }
    },1);
  }

  saveToLocal(id){
    const btn = document.querySelectorAll('.btn-success');
    btn[id-1].classList.toggle("like");
    this.http.saveLikesToLocal(id);
  }


}
