import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss']
})
export class ViewTransactionComponent implements OnInit {

  transactionList;
  constructor(public cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.getAllTransaction().subscribe((data)=>{
      this.transactionList = data;
    });
  }
  processTransaction(transaction){
    console.log("transaction processed");
  }
  cancelTransaction(transaction){
    console.log("transaction cancelled");
  }
}
