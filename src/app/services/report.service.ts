import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { API } from './api.service';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  /**
   * Экземпляр класса для работы с апи через небольшую обертку
   */
  private api: API;
  private token: string;
  private ready: Promise<any>;

  constructor(
    private storage: AppState,
    private toast: ToastController
  ) {
    this.api = new API({  });
  }

  /**
   * Получить полную информацию о посте, включая эпизоды его
   * @async
   * @param {string} id uuid поста
   * @returns {Promise<IPostFull>} результат
   */
  public async send(body: IReportBody): Promise<any> {
    this.token = await this.storage.getAsync('token') || 'invalid';

    const res = await this.api.post(`/reports`, {
      ...body,
      status: 'Created',
    }, {
      access_token: this.token
    });
    return res.data;
  }
}

export interface IReportBody {
  name?: string;
  body?: string;
  post_id?: string;
  user_id?: string;
  authod_id?: string;
  status?: string;
}
