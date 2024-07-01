import React from "react";
import Header from '../../component/header/Header';
import Table, { OrderHeadTable } from "../../components/Table";
import { orderData } from "../../data/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import './Order.css';

export default function Order() {
  return (
    <div>
      <Header page={"ORDER"} />
      <div className="flex-container">
        <div className="table-section">
          <Table headTable={OrderHeadTable} data={orderData} />
        </div>
        <div className="summary-section">
          <div className="summary-container">
            <div>
              <div className="summary-text">
                TOTAL OF ORDER: <span className="summary-amount">4</span>
              </div>
              <div className="summary-amount">63.052.000Đ</div>
              <div className="summary-detail">
                DISCOUNT:
                <div className="border-line"></div>
              </div>
              <div className="summary-detail">
                COUPON:
                <div className="border-line"></div>
              </div>
              <div className="summary-label">GUEST NEED TO PAY :</div>
              <div className="summary-amount-pay">63.052.000Đ</div>
            </div>
            <div>
              <div className="summary-payment">
                CASH:
                <div className="border-line"></div>
              </div>
              <div className="summary-payment">
                CARD:
                <div className="border-line"></div>
              </div>
              <div className="payment-other">OTHER FORMS TO PAYMENT</div>
              <div className="summary-payment-label">PAY BACK TO GUEST</div>
              <div className="payment-amount">63.052.000Đ</div>
              <div className="summary-payment">
                NOTE:
                <div className="border-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-container">
        <div className="form-inputs">
          <div className="info-grid">
            <div className="info-item">
              <Icon className="info-icon" icon="material-symbols:person" /> name: nguyễn minh hiếu
            </div>
            <div className="info-item">
              <Icon className="info-icon" icon="ic:baseline-phone" /> phone: 0939393939
            </div>
            <div className="info-item">
              <Icon className="info-icon" icon="mdi:dot" /> Loyalty Points: 149
            </div>
            <div className="info-item">
              <Icon className="info-icon" icon="mdi:calendar" /> create date: 23/05/2024
            </div>
          </div>
          <div className="button-group">
            <button className="search-button">
              <Icon className="info-icon" icon="material-symbols:search" /> SEARCH 
            </button>
            <button className="create-button">
              CREATE +
            </button>
          </div>
        </div>
        <div className="submit-container">
          <button className="submit-button">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
