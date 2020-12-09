<template>
  <section>
      <!-- <Navbar></Navbar> -->
        <div class="circle"></div>
        <div class="content">
            <div class="textBox">
                <h2>Koperasi <br>STM <span>Tadika Mesra</span></h2>
                <p>Memudahkan siswa dalam memenuhi kebutuhan perlengkapan belajar dan atribut sekolahnya selama belajar dari rumah.</p>
                <router-link to="/login">Login</router-link>
            </div>
            <div class="imgBox">
                <img src="../assets/thumb5.png" class="starbucks">
            </div>
        </div>
        <!-- <ul class="thumb">
            <li><img src="../assets/thumb1.png" onclick="imgSlider('../assets/thumb4.png');changeCircleColor('#e7a52a')"></li>
            <li><img src="../assets/thumb2.png" onclick="imgSlider('../assets/thumb5.png');changeCircleColor('#0f1ea3')"></li>
            <li><img src="../assets/thumb3.png" onclick="imgSlider('../assets/thumb6.png');changeCircleColor('#16914d')"></li>
        </ul> -->
        <ul class="sci">
            <li><a href="#"><img src="../assets/facebook.png"></a></li>
            <li><a href="#"><img src="../assets/twitter.png"></a></li>
            <li><a href="#"><img src="../assets/instagram.png"></a></li>
        </ul>
    </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// import Navbar from '../components/Navbar'

export default {
  name: 'Home',
  components: {
    // HelloWorld
    // Navbar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap');
*
{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}
section
{
    z-index: 0;
    position: relative;
    top: -100px;
    width: 100%;
    min-height: 100vh;
    padding: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
}

.content
{
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.content .textBox
{
    position: relative;
    max-width: 700px;
}
.content .textBox h2
{
    color: #333;
    font-size: 4em;
    line-height: 1.4em;
    font-weight: 500;
}
.content .textBox h2 span
{
    color: #e7a52a;
    font-size: 1.2em;
    font-weight: 900;
}
.content .textBox p
{
    color: #333;
}
.content .textBox a
{
    display: inline-block;
    margin-top: 20px;
    padding: 8px 20px;
    background: #e7a52a;
    color: #fff;
    border-radius: 40px;
    font-weight: 500;
    letter-spacing: 1px;
    text-decoration: none;
}
.content .imgBox
{
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    right: -5%;
    margin-bottom: -200px;
}
.content .imgBox img
{
    width: 780px;
    min-width: 200px;
}
.thumb
{
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    display: flex;
}
.thumb li
{
    list-style: none;
    display: inline-block;
    margin: 0 20px;
    cursor: pointer;
    transition: 1s;
}
.thumb li:hover
{
    transform: translateY(-30px);
}
.thumb li img
{
    max-width: 60px;
}
.sci
{
    position: absolute;
    top: 50%;
    right: 50px;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.sci li
{
    list-style: none;
    margin: 15px 0px;
}
.sci img
{
    max-width: 40px;
    filter: invert(1);
}
.circle
{
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #e7a52a;
    clip-path: circle(600px at right 800px);
}
</style>
