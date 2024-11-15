<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="icon" href="/Map.png">

  <router-view />
</template>


<script>

export default {

}
</script>
<style lang="scss">
@font-face{
  font-family: font-Bold;
  src: url("@/assets/font/SFProText-Bold.ttf") format('ttf');
}
@font-face{
  font-family: font-BoldItalic;
  src: url("@/assets/font/SFProText-BoldItalic.ttf");
}
@font-face{
  font-family: font-Heavy;
  src: url("@/assets/font/SFProText-Heavy.ttf");
}
@font-face{
  font-family: font-HeavyItalic;
  src: url("@/assets/font/SFProText-HeavyItalic.ttf");
}
@font-face{
  font-family: font-Light;
  src: url("@/assets/font/SFProText-Light.ttf");
}
@font-face{
  font-family: font-LightItalic;
  src: url("@/assets/font/SFProText-LightItalic.ttf");
}
@font-face{
  font-family: font-Medium;
  src: url("@/assets/font/SFProText-Medium.ttf");
}
@font-face{
  font-family: font-MediumItalic;
  src: url("@/assets/font/SFProText-MediumItalic.ttf");
}
@font-face{
  font-family: font-Regular;
  src: url("@/assets/font/SFProText-Regular.ttf");
}
@font-face{
  font-family: font-RegularItalic;
  src: url("@/assets/font/SFProText-RegularItalic.ttf");
}
@font-face{
  font-family: font-Semibold;
  src: url("@/assets/font/SFProText-Semibold.ttf");
}
@font-face{
  font-family: font-SemiboldItalic;
  src: url("@/assets/font/SFProText-SemiboldItalic.ttf");
}
$color1: linear-gradient(#2e335a, #1c1b33);
$color2: linear-gradient(#5936b4, #362a84);
$color3: linear-gradient(#3658b1, #c159ec);
$color4: linear-gradient(#aec9ff, #083072);
$color5: radial-gradient(#f7cbfd, #7758d1);


$color6: #48319d;
$color7: #1f1d47;
$color8: #c427fb;
$color9: #e0d9ff;
$color10: #ffffff;
$color11: rgba(235, 235, 245, .6);
$color12: rgba(235, 235, 245, .3);
$color13: rgba(235, 235, 245, .18);

img {
  pointer-events: none;

}
</style>
