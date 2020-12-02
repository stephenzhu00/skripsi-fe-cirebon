import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactionList;
  constructor(public cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.getAllTransactionById().subscribe((data:any)=>{
      // console.log(data);
      this.transactionList = data.transaction_history.history;
      // console.log(this.transactionList[0]);
    });
  }
}
