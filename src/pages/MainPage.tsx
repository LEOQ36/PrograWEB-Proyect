const MainPage = () => {
   return <div>
    <div className="">
        <div>Logo</div>
        <span> Game Store</span>
    </div>
    <p className="text-center mb-4">Background Color</p>
    <div className="login-box text-center">
     <h2 className="mb-3"> Sing in to GameStore</h2>
     <form>
        <div className="text-start mb-3">
            <label className="form-label">Username or email address:</label>
            <input type="text" className="form-control" required/>
        </div>
        <div className="text-start mb-3">
         <label className="form-label">Password:</label>
         <div>
          <input type="password" className="form-control me-2" required/>
          <a href="#" className="forgot-link">Forgot your password?</a>
         </div>
        </div>

        <button type="button" className="btn btn-light">Sign in</button>

     </form>
     <p className="mt-3">New to GameStore? <a href="/public/templates/R2.html">Create an account</a></p>
    </div>
   </div>
}
export default MainPage
