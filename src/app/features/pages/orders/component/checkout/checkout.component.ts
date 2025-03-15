import { ValidationMessagesComponent } from './../../../../../shared/components/validation/validation-messages/validation-messages.component';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { OrderService } from '../../service/order.service';
@Component({
  selector: 'app-checkout',
  imports: [ValidationMessagesComponent ,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private readonly orderService = inject(OrderService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);


getCartId(){
this.activatedRoute.paramMap.subscribe({
  next:(data)=>{
    console.log(data)
    this.cartId =data.get('id')
  }
})
}
  //     ==> property
  isLoding: boolean = true;
  resMsg: string = '';
  cartId:string |null ='';
  CheckOutForm!:FormGroup;
  //     ==> property

  //    ===> addrss Form
forminit(){
  this.CheckOutForm  = this.fb.group({
    details: [ '', [Validators.required]],
    phone:  ['', [Validators.required]],
    city:[  '', [Validators.required]],
  });
}


  //    ===> addrss Form

  //    ===>   submitForm
  submitForm() {
this.isLoding=true

if(this.CheckOutForm.valid || !this.isLoding){


  console.log(this.CheckOutForm.value);


  this.orderService.createCheckout(this.cartId, this.CheckOutForm.value).subscribe({
    next:(res)=>{
      console.log(res);


      this.isLoding=true
      open(res.session.url,'self')
    }
  })

}
  }
  //    ===>   submitForm


  ngOnInit(): void {
    this.getCartId()
    this.forminit()
  }
}
