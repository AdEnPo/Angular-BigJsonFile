import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import imageData from '../../models/elements.json';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  allDataSet : any;
  dataSet: any;
  searches: string="";
  itemCount = 50;

  batch = 2;
  lastKey = '';
  finished = false;

  constructor(private http: DataService ) { }
  ngOnInit() {
    this.allDataSet = this.http.datas;
    this.dataSet = this.allDataSet.slice(0,this.itemCount);
    this.http.getLikedItems();
    this.getFirst();
  }
  getFirst(){
    setTimeout(()=>{
      const btn = document.querySelectorAll('.btn-success');

      for(const items of this.http.getLikedItems()){
        btn[items-1].classList.remove ("btn-success");
        btn[items-1].classList.add ("btn-danger");
      }
    },1);
  }

  saveToLocal(id){
    const btn = document.getElementById(''+id);

      if(btn.classList.contains('btn-success')){
        btn.classList.remove ("btn-success");
        btn.classList.add ("btn-danger");
      }else{
        btn.classList.add ("btn-success");
        btn.classList.remove ("btn-danger");
      }
    
    if(!this.http.Items.includes(id)){
      this.http.saveLikesToLocal(id);
    }else{
      this.http.removeLikedItems(id);
    }    
  }
  onScroll(){
    console.log('end');
    this.loadDatas();
  }
  loadDatas(){
    let newDatas = this.allDataSet.slice(this.itemCount,this.itemCount+50);
    this.dataSet.push(newDatas);
    this.itemCount+=50;
    this.ngOnInit();
  }
}
