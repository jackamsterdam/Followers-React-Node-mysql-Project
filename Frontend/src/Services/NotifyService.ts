import { Notyf } from "notyf";
import { useNavigate } from "react-router-dom";
import authService from "./AuthService";

class NotifyService {
  //   navigate = useNavigate()
    private notification = new Notyf({ duration: 4000, position: { x: 'center', y: 'top' } ,
    types: [
        {
          type: 'success',
          background: 'darkcyan'
        },
        {
          type: 'error',
          background: '#fd6b52',
        }
      ]})

    success(message: string): void {
        this.notification.success(message)

    }

    error(err: any): void {
        const message = this.extractErrorMessage(err)
        // const responseStatus = this.getResponseStatus(err);

        // handle case when the user in not logged in or the token is expaired
        // if (responseStatus === 401) {
        //     authService.logout()
        //     window.location = '/login'
        //    // this.navigate('/login')
        // } else {
              this.notification.error(message)
        // }
    }

    private extractErrorMessage(err: any): string {
       if (typeof err === 'string') return err 

       if (typeof err.response?.data === 'string') return err.response.data 

       if (Array.isArray(err.response?.data)) return err.response.data[0]

       if (typeof err.message === 'string') return err.message 

       return 'Some error occured, please try again...'
    }

    // private getResponseStatus(err: any): number{
    //     if (err.response?.status){
    //         return err.response.status;
    //     }
    // }
}

const notify = new NotifyService()

export default notify