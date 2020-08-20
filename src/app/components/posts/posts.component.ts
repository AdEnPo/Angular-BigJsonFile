import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import imageData from '../../models/elements.json';
import { HttpClient } from '@angular/common/http';
import{LoremIpsum} from 'lorem-ipsum';
import { from } from 'rxjs';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  allDataSet : any = [];
  dataSet: any = [];
  searches: string="";
  itemCount = 50;
  text;
  lorem = new LoremIpsum({
    sentencesPerParagraph:{ max:3, min:1},
    wordsPerSentence:{ max:8, min:2 }
  });;
  constructor(private http: DataService ) { }
  ngOnInit() {
    this.allDataSet = this.http.allDatas;
    this.text= this.lorem.generateSentences();
    this.dataSet = this.allDataSet;//slice(0,this.itemCount);
    this.http.getLikedItems();
    //this.getFirst();
    this.http.getDatas();
  }
  getFirst(){
    setTimeout(()=>{
      const btn = document.querySelectorAll('.btn-success');

      for(const items of this.http.getLikedItems()){
        btn[items-1].classList.remove ("btn-success");
        btn[items-1].classList.add ("btn-danger");
      }
    },2000);
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
