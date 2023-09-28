import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';

import { CuongService } from 'cuong.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  dataAge:number=0
  listData:any
  firstName:any
  lastName: any
  id!:any
  page: number = 0
  limit: number = 5
  pages: any[] = []
  totalPage!: number
  searchData:any
  //dependency Injection
  constructor(private demoService: CuongService) {}
  ngOnChanges(changes: SimpleChange): void {}
  ngOnInit(): void {
    this.handleGet()
    this.handlePagination({ page: this.page, limit: this.limit });
  }
  handleGet():void{
    this.demoService.getData().subscribe((response)=>{
    this.listData=response
    this.totalPage = Math.ceil(response.length / this.limit);
    this.pages = Array.from({ length: this.totalPage }, (_, i) => i + 1);
    console.log(this.pages,'hiishadhs')
    
    })

  }
  
  handlePagination(data:any):void{
  this.demoService.getPagination(data).subscribe((response)=>{
    this.listData=response

  })
  }
  changePage(i:any){
    console.log(this.page)
    this.page=i
    this.handlePagination({ page: this.page, limit: this.limit });
  }
  
  saveData(){
    if(this.id== undefined){
    
    
    this.demoService.dataAdd({firstname:this.firstName,lastname:this.lastName,age:this.dataAge}).subscribe((response)=>{
      this.handleGet()
      this.dataAge= 0
      this.lastName=''
      this.firstName=''
      this.id=undefined
    })
  }
  else{
    this.demoService.editData({firstname:this.firstName,lastname:this.lastName,age:this.dataAge,id:this.id}).subscribe((response)=>{
      this.handleGet()
      this.dataAge= 0
      this.lastName=''
      this.firstName=''
      this.id= undefined
      
    })
  }
  }
  deleteData(id:number){
    this.demoService.deleteItem(id).subscribe(()=>{
      this.handleGet()
    })
  }
  editItem(){
    this.demoService.editData({firstname:this.firstName,lastname:this.lastName,age:this.dataAge,id:this.id}).subscribe((response)=>{
      
      this.handleGet()
    })
  }
  editData(data:any){
    console.log(data)
    this.firstName=data.firstname
    this.lastName=data.lastname
    this.dataAge=data.age
    this.id=data.id
    
  }
  handlegetSearch(): void {
    console.log(this.searchData,'hihih')
    this.demoService.search({ search: this.searchData }).subscribe((response) => {
      console.log(response,'cuong');
      this.listData = response
    })
  }
  }

