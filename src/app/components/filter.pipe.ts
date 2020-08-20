import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from './data.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  constructor(private http: DataService){}
  transform(value: any, arg: any): any []{
    const resultPost = [];
    
    if (arg === '' ) return value;
    //If you want to search when it's minimun 2 char add "|| arg.length < 2" to if
    for(const post of value){
      if (arg == '<3') {
        for(const item of this.http.Items){
          if(post.id == item){
            resultPost.push(post);
          }
        }
      }
      
      if (isNaN(arg) && (post.author.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
            post.url.toLowerCase().indexOf(arg.toLowerCase()) > -1)) {
        //To seach from text and author                  
        resultPost.push(post);          
      }
      else if (post.id == arg) {
        //To search from id  
        resultPost.push(post);          
      } 
    }
    return resultPost;
  }

}
