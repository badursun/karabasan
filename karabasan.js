var isim = '';
var yas = 0;
var skor = 0;
var oncekifikra = 0;
var oncekigul = 0, oncekigerizekali = 0;
var hata = 0, secim = '', secim2 = '', boyu = 0, kilo = 0;
var echo, input, cevap;
var Yazdirilacaklar = []
/*
	Start, Musallat!
*/
jQuery(document).ready(function($) {
	/* İnput 2 Echo */
	$("#input").keypress(function(e) {
	    if(e.which == 13) {
	    		cevap = $("#input").val();
	    		if(cevap.length>0){
		        echo( cevap );
					  setTimeout(function(){
					      $("#input").val('');
					  }, 500);
	    		}
	    }
	});

	/*Karabasan Diyalog Başla*/
  setTimeout(function(){
      asama0();
  }, 1000);
});
/* function: Echo */
function echo(param){
/*
	$("#echo").typetype(
	  ''+param+'\n',
	  {
	    //e: 0.03,
	    e: 0,
	    t: 30,
	    keypress: function (){
	    	//if($("#echo").val().length > 2 ){
		    	//var str = $("#echo").val().substr( ($("#echo").val().length-2), 1);
	    		//console.log(str);
	    		//if(str == "\n" || str == "" || str == " "){
	    			$("#echo").animate({scrollTop: $('#echo').prop("scrollHeight")});
	    		//}
	    	//}
	    },
	    callback: function (){
	    	$("#echo").animate({scrollTop: $('#echo').prop("scrollHeight")});
	    }
	  }
	)
*/
var waitPulse = 500, waitPulseCarpan=0.75;
if(param.indexOf("\n") !== -1){
	var str_array = param.split('\n');
	for(var i = 0; i < str_array.length; i++) {
		var Zamanlama = waitPulse*(waitPulseCarpan*i+1);
		if(Zamanlama> 1000){Zamanlama=waitPulse;}
	   $("#echo").append( str_array[i].replace("\n", "") + '\n').animate({scrollTop: $('#echo').prop("scrollHeight")}, Zamanlama);
	}

}else{
	$("#echo").append( param + '\n').animate({scrollTop: $('#echo').prop("scrollHeight")}, 1);
}

	//$("#echo").append( param + '\n').animate({scrollTop: $('#echo').prop("scrollHeight")}, 1);
	//console.log('echo : '+ param);
}

/* function: Random Üreteç*/
function karistir(max){
	var sonuc = Math.floor(Math.random() * max) + 1;
	return sonuc;
}

/* function: Karakter Sayıcı */
function say(veri){
	var param = veri.length;
	console.log('say : '+ param);
	return param;
}

/* array: adinNerdenGeliyor */
var adinNerdenGeliyor = [
		"",
    "üüüü! baya uzaktan geliyomuş!",
    "hadi canım, atıyorsun..\no kadar uzaktan mı geliyor ?",
    "at yalanı sksinler inananı..",
    "sen şimdi bununla piyasada yapıyorsundur, bence kimse yemez.."
];
var ogrencimisin = [
		"",
    "nerde öğrencisin? okulda mı??\nhihohohohhohohooo!!!\nespri konuşlandırdım!!",
    "wah! wah! wah! çok üzüldüm..\nailenin haberi varmı?\nha!haha!!hohoho!!!"
];
var fikralar = [
		"",
    "adamın biri soğuk çay istemiş...\nçaycı çayı getirmiş...\nadam da 'ISIT DA İÇELİM KARDEŞİM!' demiş!",
    "küçük kız babasına sormuş:\n'baba sapık ne demek?'\nbabası da 'SUS VE YALAMAYA DEVAM ET!'",
    "2 laz kuş avlamadaymış...\nbiri 'niye avlanamıyoz' diye dert yanmış...\nöbürü: 'BENCE KÖPEĞİ DAHA YUKARI ATMALIYIZ!",
    "bir grup laz yürüyen merdivenle çıkarken\nelektrikler kesilmiş...\n2 saat süreyle mahsur kalmışlar!!!",
    "30 yaşındaki bir Alman koskoca bir uçağı...\ntek eliyle kaldırmış..\nadam PİLOTMUŞ lan PİLOT!",
    "Temelle Dursun soygundadırlar...\nkaçarlarken polis arkalarından bağırır:\n'DUR KAÇMA OROSPU ÇOCUĞU!!'\nTemel Dursun'a dönerek:\n'Sen kaç! beni tanıdı!'"
];
var gulmeler = [
	"",
  "eki!eki!eki! köh!köh!köh! ayy nekadar neşeliyim!!",
  "neee? hahhahahahhahhhhayyyy!! kafadan kopardım gene!!   hehe!",
  "kah!keh!koh!küh! hahahahaha!!! hihihihi!! ve de hohoho!",
  "he he he he...",
  "hahahaha!! ay ben ölmiiim emi!"
];
var gerizekalilar = [
	"",
  "geri zekalı taklidi yap bakiim...\nTamam tamam bukadar yeter!!!"
];
var sovmeler = [
	"",
  "EEE! mına korum böyle oyunun!! yıkıl köpek!",
  "bana bak! seni adam yerine koyduk karşımıza aldık,.. tööbe tööbee",
  "OHA! OHA! kırsaydın klavyeyi!!",
  "doğru oyna orospu!",
  "GÖT!",
  "Vay hayvan seni!",
  "Çüşşşş öküz lazım olur o klavye sana"
];
var atasozu = [
		"",
		"yani sakla samanı gelir zamanı.",
    "yani arkadaşlarımızı dikkatli seçmemiz lazım.",
    "buradan alınacak ders: Göte giren şemsiye açılmaz.."
];

/* function: Input Kontrol */
function inputControl(Durum){
	$(".cevap").unbind("keypress");
	if(Durum=="eh"){
		$("#input").attr("maxlength", "1").attr("type", "text");
	}else if(Durum=="number"){
		$("#input").attr("maxlength", "3").attr("type", "number");
	}else{
		$("#input").attr("maxlength", "100").attr("type", "text");
	}
}

/* function: Fıkralama */
function fikra() {
  var randNum = karistir(fikralar.length-1);
  if(oncekifikra == randNum) {
  	return fikra();
  } else {
  	console.log('fikra : '+ randNum);
  	oncekifikra = randNum;
	  echo( fikralar[randNum] );
  }
}

/* function: Gülme */
function gul() {
  var randNum = karistir(gulmeler.length-1);
  if(oncekigul == randNum) {
  	return gul();
  } else {
  	oncekigul = randNum;
	  echo( gulmeler[randNum] );
  }
}

/* function: Gerizekalılama */
function gerizekali() {
  if( karistir(2) == 1){
	  echo( gerizekalilar[0] );
	}
}

/* function: Sövme */
function sov(){
	var r1 = karistir(2);
	var r2 = karistir(2);
	var r3 = karistir(2);
	var r4 = karistir(2);
	var r5 = karistir(2);
	if(r1==1){
	    echo(sovmeler[1]);
	}
	if(r2==1){
	    echo(sovmeler[2]);
	}
	if(r3==1){
	    echo(sovmeler[3]);
	}
	if(r4==1){
	    echo(sovmeler[4]);
	}
	if(r5==1){
	    echo(sovmeler[5]);
	}
}

/* function: Sesli Harf Ayıklama */
function sesliharf(harf){
    if(harf=='a' || harf=='u' || harf=='e' || harf=='ı' || harf=='ü' || harf=='ö' || harf=='i' || harf=='o'){
        return 1;
    }else{
        return 0;
    }
}

/* function: Numerik Kontrolü */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/* AŞAMA BAŞLADI */
function asama0(){
	echo("merhaba\nben karabasan...\nsenin adın ne güzelim?");
	asama1();
}
/* AŞAMA BİTTİ */

/* AŞAMA BAŞLADI */
var asama1_step1=false, asama1_step2=false, asama1_step3=false;
function asama1(){
		console.log("AŞAMA 1");
		if(asama1_step1==false && asama1_step2==false && asama1_step3==false){
			console.log('STEP 1');
			asama1_step1=true;
    	setTimeout("asama1()", 500);
    	return;
		}

    if(asama1_step1==true && asama1_step2==false && asama1_step3==false){
			console.log('STEP 2');
			/*Cevap Alma*/
			inputControl('default');
    	$(".cevap").focus();
			$(".cevap").keypress(function(e) {
			    if(e.which == 13) {
			    	if($("#input").val().length>1){
			    		asama1_step2 = true;
			    		isim = $("#input").val();
			        $("#input").val('');
			    		echo("> "+ isim);
			    		setTimeout("asama1()", 500);
			    	}else{
			    		//asama1();
			    	}
			    }
			});
			/*Cevap Alma Bitti*/
			return;
    }

    if(asama1_step1==true && asama1_step2==true && asama1_step3==false){
    	$(".cevap").unbind("keypress");
			console.log('STEP 3');

	    if(say(isim) < 2){
	        echo("Uzak doğudan mısın yoksa başka bir gezegenden mi?\n"+ say(isim) +" harfli ismini biraz zor telafuz ediyorum da...\n%c...\n%ch%s!!!\neee.. olmadı galiba... hehehehehee!"); // "+ say(isim), isim[0], isim[0],isim +"
	    }else if(say(isim) > 8){
	        echo("maaşşallaaaah!\nnüfus memuru ananı babanı pek sevmiyormuş galiba!!!");
	        gul();
	    }

	    asama1_step3=true;
	    setTimeout("asama1()", 500);
	    return;
    }

    if(asama1_step1==true && asama1_step2==true && asama1_step3==true){
    	setTimeout("asama2()", 500);
    	return;
    }
}
/* AŞAMA BİTTİ */

/* AŞAMA BAŞLADI */
var asama2_step1=false, asama2_step2=false, asama2_step3=false, asama2_step_ek=true;
function asama2(){
	console.log('AŞAMA 2');
	if(asama2_step1==false && asama2_step2==false && asama2_step3==false){
		console.log('STEP 1');
		echo(""+ isim +" kaç yaşındasın?");
		asama2_step1=true;
		setTimeout("asama2()", 500);
		return;
	}

	if(asama2_step1==true && asama2_step2==false && asama2_step3==false){
			console.log('STEP 2');
			/*Cevap Alma*/
			inputControl('number');
    	$(".cevap").focus();
			$(".cevap").keypress(function(e) {
			    if(e.which == 13) {
			    	//if( isNumeric($("#input").val()) == true){
			    	if( $("#input").val().length > 0 ){
			    		asama2_step2 = true;
			    		yas = $("#input").val();
			        $("#input").val('');
			    		echo("> "+ yas);
			    		//$("#echo").append('-'+ yas +'\n').animate({scrollTop: $('#echo').prop("scrollHeight")}, 500);
			    		setTimeout("asama2()", 500);
			    	}
			    }
			});
			/*Cevap Alma Bitti*/
			return;
	}

	if(asama2_step1==true && asama2_step2==true && asama2_step3==false){
		console.log('STEP 3');
		if( isNumeric(yas) == false){
  		echo("Yaşını gir dedik mal!");
  		asama2_step1=false; asama2_step2=false;
  		setTimeout("asama2()", 500);
		}else{
			if(yas<=4){
			    echo("çok küçükmüşsün be! sen git anan gelsin lan lavuk!");
			    asama2_step3=true;
			    setTimeout("asama3()", 500);
			}else if(yas>=5 && yas <=9){
			    echo("sütünü içtin mi yavrum?\n(e/h)? ");
					/*Cevap Alma*/
					asama2_step_ek=true;
					inputControl('eh');
		    	$(".cevap").focus();
					$(".cevap").keypress(function(e) {
					    if(e.which == 13) {
					    	if( $("#input").val() == "e" || $("#input").val() == "h"){
					    		asama2_step3=true;
					    		secim = $("#input").val();
					        $("#input").val('');
					    		echo("> "+ secim);
					    	}
					    	if(secim=="e"){
					    		echo("Beynine pek etkisi olmamış, git biraz da PEPSİ iç!");
					    		setTimeout("asama3()", 500);
					    	}
					    	if(secim=="h"){ 
					    		echo("bok iç o zaman!");
					    		setTimeout("asama3()", 500);
					    	}
					    }
					});
					return false
					/*Cevap Alma Bitti*/
			}else if(yas>=10 && yas <=17){
			    echo("iyi iyi 18ine pek bişi kalmamış... Uyu da büyü!");
			    asama2_step3=true;
			    setTimeout("asama3()", 500);
			}else if(yas>=18 && yas <=24){
			    echo("Oy kullancanmı genç?\n(e/h)? ");
					/*Cevap Alma*/
					asama2_step_ek=true;
					inputControl('eh');
		    	$(".cevap").focus();
					$(".cevap").keypress(function(e) {
					    if(e.which == 13) {
					    	if( $("#input").val() == "e" || $("#input").val() == "h"){
					    		asama2_step3=true;
					    		secim = $("#input").val();
					        $("#input").val('');
					    		echo("> "+ secim);
					    	}
					    	if(secim=="e"){ 
					    		echo("ver de gör ebeninkini!"); 
					    		setTimeout("asama3()", 500);
					    	}
					    	if(secim=="h"){ 
					    		echo("Ulan sen ne biçim Tee.Cee vatandaşısın? Hayvan!...");
					    		setTimeout("asama3()", 500);
					    	}
					    }
					});
					return;
					/*Cevap Alma Bitti*/
			}else if(yas>=25 && yas <=39){
			    echo("vayy! naber morruk? Nerde eski programcılar dimi mirim?");
			    asama2_step3=true;
			    setTimeout("asama3()", 500);
			    return;
			}else if(yas>=40 && yas <=59){
			    echo("Yuh! bayağı yaşlısın... yaşlılar muhattabım diildir.. Git estetik yaptır gel...");
			    asama2_step3=true;
			    setTimeout("asama3()", 500);
			    return;
			}else if(yas>=60 && yas <=98){
			    echo("Ulan bunak! Klavyeyi nası görüyon? Geber de helvanı yiyelim. hehehe!");
			    asama2_step3=true;
			    setTimeout("asama3()", 500);
			    return;
			}else if(yas>=99){
			    echo("Kafa bulma lan göt");
	    		asama2_step1=false; asama2_step2=false;
	    		setTimeout("asama2()", 500);
	    		return;
			} else {
				$(".cevap").unbind("keypress");
				asama2_step3=true;
				setTimeout("asama2()", 500);
				return;
			}
		}
		return;
	}

	if(asama2_step1==true && asama2_step2==true && asama2_step3==false && asama2_step_ek==false){
		console.log('STEP 4');
		setTimeout("asama3()", 500);
		return;
	}

}
/* AŞAMA BİTTİ */

/* AŞAMA BAŞLADI */
var asama3_step1=false, asama3_step2=false, asama3_step3=false;
function asama3(){
		console.log('AŞAMA 3');
    if(asama3_step1==false && asama3_step2==false && asama3_step3==false){
    	console.log('STEP 1');
	    echo("boyun kaç cm senin?");
	    asama3_step1=true;
	    setTimeout("asama3()", 500);
	    return;
    }

    if(asama3_step1==true && asama3_step2==false && asama3_step3==false){
			/*Cevap Alma*/
			inputControl('number');
    	$(".cevap").focus();
			$(".cevap").keypress(function(e) {
			    if(e.which == 13) {
			    	//if( isNumeric($("#input").val()) == true){
			    	if( $("#input").val().length > 0 ){
			    		asama3_step2 = true;
			    		boyu = $("#input").val();
			        $("#input").val('');
			    		echo("> "+ boyu);
			    		setTimeout("asama3()", 500);
			    		return;
			    	}
			    }
			});
			/*Cevap Alma Bitti*/
    }

    if(asama3_step1==true && asama3_step2==true && asama3_step3==false){
    	console.log('STEP 2');
    	if( isNumeric(boyu) == false){
    		echo("Salak boyunu harf ile mi yazıyorsun? sana matematik öğretmediler mi?");
    		setTimeout("asama3()", 500);
    		return;
    	}else{
		    if(boyu<=99){
		        echo("Deden pigmelerin hangi kavminden lan?");
		        asama3_step3=true;
		        setTimeout("asama3()", 500);
		        return;
		    }else if(boyu>=100 && boyu<=149){
		        echo("Kısa boylu olman önemli diil, diyeceğimi sanıyorsan yanılıyorsun pis cüce!");
		        asama3_step3=true;
		        setTimeout("asama3()", 500);
		        return;
		    }else if(boyu>=150 && boyu<=169){
		        echo("Bacaklarına biraz gübre ektir. Faydası olur. kah!kih!koh!");
		        asama3_step3=true;
		        setTimeout("asama3()", 500);
		        return;
		    }else if(boyu>=170 && boyu<=189){
		        echo("iyi... bana ne... sorduk mu ?!");
		        asama3_step3=true;
		        setTimeout("asama3()", 500);
		        return;
		    }else if(boyu>=190 && boyu<=209){
		        echo("Oha! fasülye sırığı!");
		        asama3_step3=true;
		        setTimeout("asama3()", 500);
		        return;
		    }else if(boyu>=210){
		        echo("Yok deve!! kaç santim dedik, milim demedik!");
		        asama3_step1=false; asama3_step2=false;
		        setTimeout("asama3()", 500);
		        return;
		    }
    	}
    }

    if(asama3_step1==true && asama3_step2==true && asama3_step3==true){
    	console.log('STEP 3');
      setTimeout("asama4()", 500);
      return;
    }

}
/* AŞAMA BİTTİ */

/* AŞAMA BAŞLADI */
var asama4_step1=false, asama4_step2=false, asama4_step3=false;
function asama4(){
		console.log('AŞAMA 4');
    if(asama4_step1==false && asama4_step2==false && asama4_step3==false){
    	console.log('STEP 1');
	    echo("oldu olcak kilonu da söyle bari... çok umurumda ya...");
	    asama4_step1=true;
      setTimeout("asama4()", 500); return;
    }

    if(asama4_step1==true && asama4_step2==false && asama4_step3==false){
			/*Cevap Alma*/
			inputControl('number');
    	$(".cevap").focus();
			$(".cevap").keypress(function(e) {
			    if(e.which == 13) {
			    	//if( isNumeric($("#input").val()) == true){
			    	if( $("#input").val().length > 0 ){
			    		asama4_step2 = true;
			    		kilo = $("#input").val();
			        $("#input").val('');
			    		echo("> "+ kilo);
			    		setTimeout("asama4()", 500); return;
			    	}
			    }
			});
			/*Cevap Alma Bitti*/
    }

    if(asama4_step1==true && asama4_step2==true && asama4_step3==false){
    	if( isNumeric(kilo) == false){
    		echo("Salak boyunu harf ile mi yazıyorsun? sana matematik öğretmediler mi?");
    		asama4_step2=false;
    		setTimeout("asama4()", 500); return;
    	}else{
		    if(kilo<=39){
		        echo("Rüzgarlı havada dışarı falan çıkma hehehe!");
		        gerizekali();
		        asama4_step3=true;
		        setTimeout("asama4()", 500); return;
		    }else if(kilo>=40 && kilo<=59){
		        echo("o kadar yemiş yersen ishal de olursun, kabız da!");
		        gerizekali();
		        asama4_step3=true;
		        setTimeout("asama4()", 500); return;
		    }else if(kilo>=60 && kilo<=79){
		        echo("sen normalsin o yüzden dalga geçmiicem... noormaal! noormaal! hehehe!!");
		        gerizekali();
		        asama4_step3=true;
		        setTimeout("asama4()", 500); return;
		    }else if(kilo>=80 && kilo<=99){
		        var degis = karistir(3);
		        console.log("Kilo Random: "+ degis);
		        if(degis==0){
		            echo("Lütfen, oturduğun koltuk sağlam kalsın!");
		        }else if(degis==1){
		            echo("Maaşşallaaah! damızlıkmısın? hangi çiftlikte yetiştin? keh!keh!keh!!.");
		        }else if(degis==2){
		            echo("Duba! dikkat et benim üstüme düşme!");
		        }
		        gerizekali();
		        asama4_step3=true;
		        setTimeout("asama4()", 500); return;
		    }else if(kilo>=100){
		        echo("Anlamıştım... 2 saattir klavyenin anasını ağlattın");
		        gerizekali();
		        asama4_step3=true;
		        setTimeout("asama4()", 500); return;
		    }
    	}
    }

    if(asama4_step1==true && asama4_step2==true && asama4_step3==true){
    	setTimeout("asama5()", 500); return;
    }
}
/* AŞAMA BİTTİ */

/* AŞAMA */
var asama5_step1=false,asama5_step2=false,asama5_step3=false,
		asama5_step4=false,asama5_step5=false,asama5_step6=false,
		asama5_step7=false,asama5_step8=false,asama5_step9=false; 
function asama5(){
    // ADIM 1
    if(asama5_step1==false && asama5_step2==false && asama5_step3==false && asama5_step4==false && asama5_step5==false && asama5_step6==false && asama5_step7==false &&  asama5_step8==false && asama5_step9==false ){
	    echo(""+ isim +" sana gözlerinin çok güzel olduğunu söyleyen olmuşmuydu hiç\n(e/h)? ");
					/*Cevap Alma*/
					inputControl('eh');
		    	$(".cevap").focus();
					$(".cevap").keypress(function(e) {
					    if(e.which == 13) {
					    	if( $("#input").val() == "e" || $("#input").val() == "h"){
					    		asama5_step1=true;
					    		secim = $("#input").val();
					        $("#input").val('');
					    		echo("> "+ secim);
						    	if(secim=="e"){ echo("yalan söylemiş!");}
						    	if(secim=="h"){ echo("doğrudur. çünkü gözlerin güzel diil!");}
						    	gul();
						    	setTimeout("asama5()", 500); return;
					    	}
					    }
					});
					return false
					/*Cevap Alma Bitti*/
    }

    // ADIM 2
    if(asama5_step1==true && asama5_step2==false && asama5_step3==false && asama5_step4==false && asama5_step5==false && asama5_step6==false && asama5_step7==false &&  asama5_step8==false && asama5_step9==false ){
    		echo("yavrum "+ isim +" ayda 50 milyon kazanmak istermisin?\n(e/h)? ");
					/*Cevap Alma*/
					inputControl('eh');
		    	$(".cevap").focus();
					$(".cevap").keypress(function(e) {
					    if(e.which == 13) {
					    	if( $("#input").val() == "e" || $("#input").val() == "h"){
					    		asama5_step2=true;
					    		secim = $("#input").val();
					        $("#input").val('');
					    		echo("> "+ secim);
						    	if(secim=="e"){ echo("o zaman Ay'a gitmen lazım...");}
						    	if(secim=="h"){ echo("iyi... zaten Ay'da sağlıklı çalışabileceğini sanmıyordum.");}
						    	gul();
						    	setTimeout("asama5()", 500); return;
					    	}
					    }
					});
					return false
					/*Cevap Alma Bitti*/
    }

    // ADIM 3
    if(asama5_step1==true && asama5_step2==true && asama5_step3==false && asama5_step4==false && asama5_step5==false && asama5_step6==false && asama5_step7==false &&  asama5_step8==false && asama5_step9==false ){

    		echo(""+ isim +" adı nerden geliyo?");
					/*Cevap Alma*/
					inputControl('default');
		    	$(".cevap").focus();
					$(".cevap").keypress(function(e) {
					    if(e.which == 13) {
					    	if( $("#input").val().length > 1 ){
					    		asama5_step3=true;
					    		secim = $("#input").val();
					        $("#input").val('');
					    		echo("> "+ secim);
						    	echo( adinNerdenGeliyor[ karistir(adinNerdenGeliyor.length-1) ] );
						    	gul();
						    	setTimeout("asama5()", 500); return;
					    	}
					    }
					});
					return;
					/*Cevap Alma Bitti*/
    }

    // ADIM 4
    if(asama5_step1==true && asama5_step2==true && asama5_step3==true && asama5_step4==false && asama5_step5==false && asama5_step6==false && asama5_step7==false &&  asama5_step8==false && asama5_step9==false ){
    		echo(""+ isim +" bi sayı tut.\ntuttunmu?\n(e/h)");
					/*Cevap Alma*/
					inputControl('eh');
		    	$(".cevap").focus();
					$(".cevap").keypress(function(e) {
					    if(e.which == 13) {
					    	if( $("#input").val() == "e" || $("#input").val() == "h"){
					    		asama5_step4=true;
					    		secim = $("#input").val();
					        $("#input").val('');
					    		echo("> "+ secim);
						    	if(secim=="e"){ echo("şimdi de bırak!");}
						    	if(secim=="h"){ echo("bi sayıyı tutamadın allah belanı versin");}
						    	gul();
						    	setTimeout("asama5()", 500); return;
					    	}
					    }
					});
					return;
					/*Cevap Alma Bitti*/
    }

    // ADIM 5
    if(asama5_step1==true && asama5_step2==true && asama5_step3==true && asama5_step4==true && asama5_step5==false && asama5_step6==false && asama5_step7==false &&  asama5_step8==false && asama5_step9==false ){

	    if(isim[1]=='a' || isim[1]=='e' || isim[1]=='o' || isim[1]=='ö' || isim[1]=='ı' || isim[1]=='i' || isim[1]=='u' || isim[1]=='ü'){
	        echo(""+ isim +" sana kısaca "+ isim.substr(0,3) +"coş diyebilirmiyim??\n(e/h)");
	    }else{
	        echo(""+ isim +" sana kısaca "+ isim.substr(0,2) +"oş diyebilirmiyim??\n(e/h)"); 
	    }
					/*Cevap Alma*/
					inputControl('eh');
		    	$(".cevap").focus();
					$(".cevap").keypress(function(e) {
					    if(e.which == 13) {
					    	if( $("#input").val() == "e" || $("#input").val() == "h"){
					    		asama5_step5=true;
					    		secim = $("#input").val();
					        $("#input").val('');
					    		echo("> "+ secim);
						    	if(secim=="e"){ echo("iyi... ama ben demek istemiyorum!");}
						    	if(secim=="h"){ 
						        if(isim[1]=='a' || isim[1]=='e' || isim[1]=='o' || isim[1]=='ö' || isim[1]=='ı' || isim[1]=='i' || isim[1]=='u' || isim[1]=='ü'){
						            echo(""+ isim.substr(0,3) +"coş! "+ isim.substr(0,3) +"coş! "+ isim.substr(0,3) +"coş!");
						        }else{
						            echo(""+ isim.substr(0,2) +"oş! "+ isim.substr(0,2) +"oş! "+ isim.substr(0,2) +"oş!");
						        }
						    	}
						    	gul();
						    	setTimeout("asama5()", 500); return;
					    	}
					    }
					});
					
					$("#input").val('');
					return;
					/*Cevap Alma Bitti*/
    }

    // ADIM 6
    if(asama5_step1==true && asama5_step2==true && asama5_step3==true && asama5_step4==true && asama5_step5==true && asama5_step6==false && asama5_step7==false &&  asama5_step8==false && asama5_step9==false ){
			echo("nasılsınız lan "+ isim +" ?\niyimisin ki\n(e/h)");
					/*Cevap Alma*/
					inputControl('eh');
		    	$(".cevap").focus();
					$(".cevap").keypress(function(e) {
					    if(e.which == 13) {
					    	if( $("#input").val() == "e" || $("#input").val() == "h"){
					    		asama5_step6=true;
					    		secim = $("#input").val();
					    		echo("> "+ secim);
						    	if(secim=="e"){
									  var rand6 = karistir(3);
									  if(rand6==0){
									      echo("niye iyisin? oturduğun yere bir bak bakiim...\njoysitick falan unutmuş olmasınlar?");
									      setTimeout("asama5()", 500); return;
									  }else if(rand6==1){
									      echo("iyi iyi... sen iyi olmaya devam et "+isim+"!\nuyu da büyü!");
									      setTimeout("asama5()", 500); return;
									  }else if(rand6==2){
									      echo("böyle bir hayatta nasıl iyi oluyorsunuz ki lan "+ isim +"?\nbize de söyle yolunu biz de iyi olalım..");
									      setTimeout("asama5()", 500); return;
									  }
						    	}
						    	if(secim=="h"){
									  var rand62 = karistir(3);
									  if(rand62==0){
									      echo("bana ne lan! geber!");
									      gul();
									      setTimeout("asama5()", 500); return;
									  }else if(rand62==1){
									      echo("iyi iyi allah kötülük versin! he he he !!");
									      gul();
									      setTimeout("asama5()", 500); return;
									  }else if(rand62==2){
									      echo("derdini anlat bana! açıl bana yavrucuum! utanma ben doktorum...\nKötü olmana sebep olan şey nedir?");
												/*Cevap Alma*/
												inputControl('default');
									    	$(".cevap").focus();
												$(".cevap").keypress(function(e) {
												    if(e.which == 13) {
												    	if( $("#input").val().length > 1 ){
												    		secim2 = $("#input").val();
												        $("#input").val('');
												    		echo("> "+ secim);
													    	echo(""+ secim2 +"??\nhahahahahahahaha!!! git allasen yaw! dert  ettiğin şeye bak!");
													    	gul();
													    	setTimeout("asama5()", 500); return;
												    	}
												    }
												});
												return;
												/*Cevap Alma Bitti*/
									  }

						    	}
					    	}
					    }
					});
					return;
					/*Cevap Alma Bitti*/
    }


    // ADIM 7
    if(asama5_step1==true && asama5_step2==true && asama5_step3==true && asama5_step4==true && asama5_step5==true && asama5_step6==true && asama5_step7==false &&  asama5_step8==false && asama5_step9==false ){
			echo("neyse... "+isim+" öğrencimisin?\n(e/h)");
					/*Cevap Alma*/
					inputControl('eh');
		    	$(".cevap").focus();
					$(".cevap").keypress(function(e) {
					    if(e.which == 13) {
					    	if( $("#input").val() == "e" || $("#input").val() == "h"){
					    		asama5_step7=true;
					    		secim = $("#input").val();
					        $("#input").val('');
					    		echo("> "+ secim);
						    	if(secim=="e"){ 
						    			echo(ogrencimisin[ karistir(ogrencimisin.length-1) ]);
						    			gul();
						    			setTimeout("asama5()", 500); return;
						    	}
						    	if(secim=="h"){
									  var rand72 = karistir(2);
									  if(rand72==1){
									      echo("ulan insan en azından askerden yırtmak için öğrenci olur! Ama sen, tıss!");
									  }else if(rand72==2){
									  		echo("hangi işle meşgulsun o vakit?");
												/*Cevap Alma*/
												inputControl('default');
									    	$(".cevap").focus();
												$(".cevap").keypress(function(e) {
												    if(e.which == 13) {
												    	if( $("#input").val().length > 1 ){
												    		secim2 = $("#input").val();
												        $("#input").val('');
												    		echo("> "+ secim2);
													    	echo("siktir lan göt! cümle alem senin ne mal olduğunu biliyor!.");
													    	gul();
													    	setTimeout("asama5()", 500); return;
												    	}
												    }
												});
												return;
												/*Cevap Alma Bitti*/
									  }
						    	}
					    	}
					    }
					});
					return;
					/*Cevap Alma Bitti*/

    }

    // ADIM 8
    if(asama5_step1==true && asama5_step2==true && asama5_step3==true && asama5_step4==true && asama5_step5==true && asama5_step6==true && asama5_step7==true &&  asama5_step8==false && asama5_step9==false ){
    	setTimeout("asama6()", 500); return;
    }

}
/* AŞAMA BİTTİ */

/* AŞAMA */
var asama6_step1=false,asama6_step2=false,asama6_step3=false,
		asama6_step4=false,asama6_step5=false,asama6_step6=false,
		asama6_step7=false,asama6_step8=false,asama6_step9=false; 
function asama6(){
    if(asama6_step1==false && asama6_step2==false && asama6_step3==false && asama6_step4==false && asama6_step5==false && asama6_step6==false && asama6_step7==false &&  asama6_step8==false && asama6_step9==false ){
    	echo("bak sana şindi konuyla ilgili bir fıkra...");
    	asama6_step1=true
    	setTimeout("asama6()", 500); return;
    }
    if(asama6_step1==true && asama6_step2==false && asama6_step3==false && asama6_step4==false && asama6_step5==false && asama6_step6==false && asama6_step7==false &&  asama6_step8==false && asama6_step9==false ){
    	fikra();
    	asama6_step2=true
    	setTimeout("asama6()", 500); return;
    }
    if(asama6_step1==true && asama6_step2==true && asama6_step3==false && asama6_step4==false && asama6_step5==false && asama6_step6==false && asama6_step7==false &&  asama6_step8==false && asama6_step9==false ){
    	gul();
    	asama6_step3=true
    	setTimeout("asama6()", 500); return;
    }
    if(asama6_step1==true && asama6_step2==true && asama6_step3==true && asama6_step4==false && asama6_step5==false && asama6_step6==false && asama6_step7==false &&  asama6_step8==false && asama6_step9==false ){
    	echo( atasozu[karistir(atasozu.length-1)] );
    	asama6_step4=true
    	setTimeout("asama6()", 500); return;
    }
    if(asama6_step1==true && asama6_step2==true && asama6_step3==true && asama6_step4==true && asama6_step5==false && asama6_step6==false && asama6_step7==false &&  asama6_step8==false && asama6_step9==false ){
    	gul();
    	asama6_step5=true
    	setTimeout("asama6()", 500); return;
    }
    if(asama6_step1==true && asama6_step2==true && asama6_step3==true && asama6_step4==true && asama6_step5==true && asama6_step6==false && asama6_step7==false &&  asama6_step8==false && asama6_step9==false ){

    	asama6_step6=true
    	setTimeout("asama7()", 500); return;
    }
}
/* AŞAMA BİTTİ */

/* AŞAMA */
function asama7(){

}
/* AŞAMA BİTTİ */

/* AŞAMA */
function asama8(){

}
/* AŞAMA BİTTİ */

/* AŞAMA */
function asama9(){

}
/* AŞAMA BİTTİ */

/* AŞAMA */
function asama10(){

}
/* AŞAMA BİTTİ */

/* TypeWrite plugin */
$.fn.extend({backspace:function(e,t){var n;return n=$.extend({callback:function(){},keypress:function(){},t:100,e:.04},t),this.each(function(){var t;t=this,$(t).queue(function(){var i,a;a=function(e,i){e?(t[/(np|x)/i.test(t.tagName)?"value":"innerHTML"]=t[/(np|x)/i.test(t.tagName)?"value":"innerHTML"].slice(0,-1),n.keypress.call(t),setTimeout(function(){a(e-1,i)},n.t)):(n.callback.call(t),$(t).dequeue())},i=function(e,a){e?(t[/(np|x)/i.test(t.tagName)?"value":"innerHTML"]+=e[0],n.keypress.call(t),setTimeout(function(){i(e.slice(1),a)},n.t)):a()},a(e)})})},typetype:function(e,t){var n;return n=$.extend({callback:function(){},keypress:function(){},t:100,e:.04},t),this.each(function(){var t;t=this,$(t).queue(function(){var i,a,c;a=function(e,i){e?(t[/(np|x)/i.test(t.tagName)?"value":"innerHTML"]=t[/(np|x)/i.test(t.tagName)?"value":"innerHTML"].slice(0,-1),n.keypress.call(t),setTimeout(function(){a(e-1,i)},n.t)):i()},i=function(e,a){e?(t[/(np|x)/i.test(t.tagName)?"value":"innerHTML"]+=e[0],n.keypress.call(t),setTimeout(function(){i(e.slice(1),a)},n.t)):a()},(c=function(u){var s,l;s=function(){return setTimeout(function(){c(u)},Math.random()*n.t*(e[u-1]===e[u]?1.6:"."===e[u-1]?12:"!"===e[u-1]?12:"?"===e[u-1]?12:"\n"===e[u-1]?12:","===e[u-1]?8:";"===e[u-1]?8:":"===e[u-1]?8:" "===e[u-1]?3:2))},l=Math.random()/n.e,e.length>=u?.3>l&&e[u-1]!==e[u]&&e.length>u+4?i(e.slice(u,u+4),function(){a(4,s)}):.7>l&&u>1&&/[A-Z]/.test(e[u-2]&&e.length>u+4)?i(e[u-1].toUpperCase()+e.slice(u,u+4),function(){a(5,s)}):.5>l&&e[u-1]!==e[u]&&e.length>u?i(e[u],function(){a(1,s)}):1>l&&e[u-1]!==e[u]&&e.length>u?i(e[u]+e[u-1],function(){a(2,s)}):.5>l&&/[A-Z]/.test(e[u])?i(e[u].toLowerCase(),function(){a(1,s)}):(t[/(np|x)/i.test(t.tagName)?"value":"innerHTML"]+=e[u-1],n.keypress.call(t),setTimeout(function(){c(u+1)},Math.random()*n.t*(e[u-1]===e[u]?1.6:"."===e[u-1]?12:"!"===e[u-1]?12:"?"===e[u-1]?12:"\n"===e[u-1]?12:","===e[u-1]?8:";"===e[u-1]?8:":"===e[u-1]?8:" "===e[u-1]?3:2))):(n.callback.call(t),$(t).dequeue())})(1)})})}});
