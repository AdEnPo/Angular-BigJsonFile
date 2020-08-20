import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import imageData from '../models/elements.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  datas:{id: number, author: string, text: string, photo: string} [] = imageData;
  Items: any = [];
  key= 'Liked Posts';

  allDatas: any= [];

  constructor(private http: HttpClient) {

  }
  saveLikesToLocal(id){
    this.Items.push(id);
    sessionStorage.setItem(this.key,this.Items);
    return 0;
  }
  getDatas(){
    for (let i = 0; i <200; i++) {
      if(i==86 || i==97 || i==105 || i== 138 || i== 148 || i== 150 ) continue;
      let url = "https://picsum.photos/id/"+i+"/info";
      let text="Lorem"+i;
      this.http.get(url).subscribe(d=>{
        this.allDatas.push(d);
      });
    }
    //console.log(this.allDatas);
  
  }
  addNewElement(){
    console.log(this.allDatas.length);
  }
  getLikedItems(){
     //isNaN ile string değil number array yapabilirsin
     if (sessionStorage.length == 0) {
      return [];
    }else{
      let getItems= sessionStorage.getItem(this.key);
      let getItemArr = getItems.split(',').map(el =>{
        let n = Number(el);
        return n;
      });
      this.Items = getItemArr;
      return getItemArr;
    }
  }

  removeLikedItems(id){
    let index = this.Items.findIndex(e => e == id);
    this.Items.splice(index,1);
    sessionStorage.setItem(this.key,this.Items);
  }
   
  /*datas: any =[{"id":1,"author":"Emylee Hurnell","photo":"https://picsum.photos/200/300","text":"risus praesent lectus vestibulum quam sapien varius ut blandit non"},
    {"id":2,"author":"Mozes Henzer","photo":"https://picsum.photos/200/300","text":"facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros"},
    {"id":3,"author":"Kahaleel Primak","photo":"https://picsum.photos/200/300","text":"elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam"},
    {"id":4,"author":"Aile Sweeny","photo":"https://picsum.photos/200/300","text":"ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis"},
    {"id":5,"author":"Glad Feehely","photo":"https://picsum.photos/200/300","text":"orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae"},
    {"id":6,"author":"Klarrisa Yeowell","photo":"https://picsum.photos/200/300","text":"lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit"},
    {"id":7,"author":"Dinnie Jeans","photo":"https://picsum.photos/200/300","text":"vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula"},
    {"id":8,"author":"Vivyanne Pencott","photo":"https://picsum.photos/200/300","text":"commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula"},
    {"id":9,"author":"Seymour Selman","photo":"https://picsum.photos/200/300","text":"tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam"},
    {"id":10,"author":"Minor Happs","photo":"https://picsum.photos/200/300","text":"pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus"},
  ];*/
}
