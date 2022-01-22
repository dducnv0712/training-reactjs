import React, { Component } from "react";
import { Child } from "./Child";

export class Mother extends Component {
    constructor(props) {
        super(props);
        this.state = {
            money: 500000,
            moneySent:0,
            moneyReceived:0,
            moneyInput:0,
            isSendMoney:false,
            isSendSuccess:0
        }
    }
    //hàm gửi tiền cho con
    handleSendMoney = () =>{
        const {moneyInput,money,moneySent} = this.state;
        let moneyInputParte = parseInt(moneyInput);
        if(money > moneyInput){
            this.setState({
                moneySent:moneyInputParte,
                money:money - moneyInputParte,
                moneySent:moneySent + moneyInputParte,
                isSendMoney:true,
                isSendSuccess:1
            });
        }else{
            this.setState({
                isSendSuccess:-1
            })
        }
      
    }
    //hàm nhận tiền từ con
    getMoneyFromChild = (moneyFromChild) =>{
        const {moneyReceived,money} = this.state;
        this.setState({
            moneyReceived:moneyReceived + moneyFromChild,
            money:money + moneyFromChild,
            isSendMoney:false
        });
    }

    render() {
        const { money, moneySent,moneyReceived,moneyInput,isSendMoney,isSendSuccess} = this.state;
        return (
            <>
                <div className="col-md-6 mb-3">
                    <div className="row">
                        <div className="col-md-12">
                            
                            {isSendSuccess == 1?
                                <div class="alert alert-success alert-dismissible fade show" role="alert">
                                    Chuyển tiền thành công
                                    <button onClick={()=>this.setState({isSendSuccess:0})} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                                :
                                isSendSuccess == -1?
                                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    Chuyển tiền thất bại
                                    <button onClick={()=>this.setState({isSendSuccess:0})} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                              </div>
                                :""
                            }
                           
                        </div>
                    </div>
                    <h1>STK Mẹ</h1>
                    <h2>Số dư : {money} </h2>
                    <h2>Tổng số tiền đã chuyển : {moneySent} </h2>
                    <h2>Số tiền đã nhận : {moneyReceived} </h2>
                    <input value={moneyInput} onChange={(ev)=> this.setState({moneyInput:ev.target.value})} className="form-control" type="number" />
                    <button onClick={this.handleSendMoney} className="btn btn-primary mt-3">Chuyen Tien</button>
                </div>
                <Child
                 getMoneyFromChild={this.getMoneyFromChild}
                 childReceiveMoney={moneySent} 
                 isSendMoney={isSendMoney}
                 />
            </>
        )
    }
}