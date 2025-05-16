import Logo from "../components/Logo"
const ChangePassword = () => {
    return <div className=" body fondo ">
        <div>
            <div className="text-center"><Logo/></div>
            <h3 className="text-center mb-4">Reset your Password</h3>
            <div className="container">
                <p>
                    Enter your user account's verified email address and we will send you a password restet confirmation message.
                </p>
                <form>
                    <div>
                        <input type="email" className="form-control" required/>
                    </div>
                    <div className="mb-3 text-start">
                        <label>New password:</label>
                        <input type="password" className="form-control" required/>
                    </div>

                    <div className="mb-3 text-start">
                        <label>Confirm new password:</label>
                        <input type="password" className="form-control" required/>
                    </div>

                    <button type="submit" className="btn btn-custom w-100">Send password reset email</button>
                </form>
            </div>

 

        </div>
</div>


}

export default ChangePassword