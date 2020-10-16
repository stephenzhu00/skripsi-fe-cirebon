import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  rating =3;
  constructor(public cartService:CartService) { }

  ngOnInit(): void {
  }
  saveRating(transaction){
    
  }
}
