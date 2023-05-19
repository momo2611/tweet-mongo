<template>
    <div class="container">
        <div class="box box-one">
            <i class="fab fa-twitter"><img src="https://img.icons8.com/color/50/000000/twitter--v1.png" /></i>
            <button>
                <img src="../UI/google.png" width="19">
                <span>Sign in with Google</span>
            </button>
            <button>
                <img src="../UI/apple.png" width="19">
                <span>Sign in with Apple</span>
            </button>
        </div>
        <h5>Or</h5>
        <div class="box box-two">
            <AuthForm />
            <button class="mt-3">Forget Password</button>
        </div>
        <p>Don't have an account <a href="#" class="sign-up">Sign Up</a></p>
    </div>
</template>
<script setup>
</script>
<style scoped>
.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 70%;
    height: 75%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(211, 210, 210);
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.box,
.box button {
    display: flex;
    align-items: center;
}

.box {
    width: 500px;
    height: fit-content;
    flex-direction: column;
    justify-content: space-evenly;
}

.box button {
    width: 300px;
    height: 40px;
    background-color: #fff;
    outline: none;
    font-weight: bold;
    border: 1px solid rgb(211, 210, 210);
    border-radius: 20px;
    justify-content: center;
    margin-top: 8px;
    margin-bottom: 8px;
}

.box button:hover {
    background-color: rgb(226, 231, 237);
}

.box-one button img {
    margin: 0 .5rem;
}

.box-one i {
    color: #00acee;
    font-size: 1.8rem;
}

.box-two .next-btn {
    background-color: #121212;
    color: #fff;
}

.box-two .next-btn:hover {
    background-color: #1c1c1c;
}

.container p {
    font-size: .7rem;
    color: rgb(138, 136, 136);
}

.container p a {
    text-decoration: none;
    color: #00acee;
}

.sign-up:hover {
    text-decoration: underline;
}
</style>
