import React, { Component } from "react"

export class Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moneyChild:0,
            moneySent:0,
            moneyReceived:0,
            moneyInput:0,
            isMoneySent:false,
            isSendSuccess:0
        }
    }
    componentWillReceiveProps = (nextProps) => {
        const {moneyChild} = this.state;
        console.log(nextProps);
        if(nextProps.isSendMoney){
            this.setState({
                moneyReceived:nextProps.childReceiveMoney,
                moneyChild:nextProps.childReceiveMoney,
            });
        }
    }
    sendMoneyToMother = () => {
        //hàm gửi tiền từ con đến mẹ
        const {moneyInput,moneySent,moneyChild,isMoneySent} = this.state;
        let moneyInputPaste = parseInt(moneyInput);
          //sẽ gửi đc nếu số tiền gửi mà lớn hơn số tiền hiện có
        if(moneyChild >= moneyInputPaste){
            this.setState({
                moneySent:moneySent + moneyInputPaste,
                moneyChild:moneyChild - moneyInputPaste,
                isSendSuccess:1
            });
            this.props.getMoneyFromChild(moneyInputPaste);
        }else{
            this.setState({
                isSendSuccess:-1
            });
        }
      
    }
    render() {
        const {moneyChild,moneySent,moneyReceived,moneyInput,isSendSuccess} = this.state;
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
                    <h1>STK Con</h1>
                    <h2>Số dư : {moneyChild} </h2>
                    <h2>Tổng số tiền đã chuyển : {moneySent} </h2>
                    <h2>Số tiền đã nhận : {moneyReceived} </h2>
                    <input value={moneyInput} onChange={(ev)=>this.setState({moneyInput:ev.target.value})} className="form-control" type="number" />
                    <button onClick={this.sendMoneyToMother} className="btn btn-primary mt-3">Chuyen Tien</button>
                </div>
            </>
        )
    }
}