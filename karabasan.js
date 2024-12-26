var isim = "";
var yas = 0;
var skor = 0;
var oncekifikra = 0;
var oncekigul = 0,
  oncekigerizekali = 0;
var hata = 0,
  secim = "",
  secim2 = "",
  boyu = 0,
  kilo = 0;
var echo, input, cevap;
var Yazdirilacaklar = [];
/*
	Start, Musallat!
*/
class TypeWriter {
  constructor() {
    this.queue = [];
    this.isTyping = false;
  }

  async type(text, element, options = {}) {
    const defaults = {
      minSpeed: 20,
      maxSpeed: 50,
      mistakeProbability: 0.03,
      pauseProbability: 0.1,
      pauseMaxDuration: 500,
      deleteSpeed: 30,
      finalPause: 200,
      style: "normal", // 'normal', 'alert', 'processing'
    };

    const settings = { ...defaults, ...options };

    // Eğer alert stili ise, direkt göster
    if (settings.style === "alert") {
      element.className = "system-alert";
      element.textContent = text;
      await this.sleep(1000); // Alert mesajı için bekleme süresi
      return;
    }

    // Eğer processing stili ise, processing animasyonu göster
    if (settings.style === "processing") {
      element.className = "system-processing";
      element.textContent = text;
      await this.sleep(settings.finalPause);
      return;
    }

    // Normal typewriter efekti
    let currentText = "";
    element.className = "typing-line";
    const textSpan = document.createElement("span");
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    element.appendChild(textSpan);
    element.appendChild(cursor);

    for (let i = 0; i < text.length; i++) {
      if (Math.random() < settings.pauseProbability) {
        await this.sleep(Math.random() * settings.pauseMaxDuration);
      }

      if (Math.random() < settings.mistakeProbability && text[i] !== " ") {
        const wrongChar = this.getRandomChar();
        currentText += wrongChar;
        textSpan.textContent = currentText;
        await this.sleep(settings.deleteSpeed * 2);

        currentText = currentText.slice(0, -1);
        textSpan.textContent = currentText;
        await this.sleep(settings.deleteSpeed);

        currentText += text[i];
        textSpan.textContent = currentText;
      } else {
        currentText += text[i];
        textSpan.textContent = currentText;
      }

      await this.sleep(
        Math.random() * (settings.maxSpeed - settings.minSpeed) +
          settings.minSpeed
      );
    }

    element.removeChild(cursor);
    await this.sleep(settings.finalPause);
  }

  getRandomChar() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

class KarabasanStageManager {
  constructor() {
    this.currentStage = 0;
    this.userData = {
      name: "",
      age: 0,
      height: 0,
      weight: 0,
      score: 0,
    };
    this.previousJoke = 7;
    this.errorCount = 0;
  }

  // Rastgele yanıt seçici
  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Fıkra sistemi
  getJoke() {
    const jokes = [
      "adamın biri soğuk çay istemiş...\nçaycı çayı getirmiş...\nadam da 'ISIT DA İÇELİM KARDEŞİM!' demiş!",
      "küçük kız babasına sormuş:\n'baba sapık ne demek?'\nbabası da 'SUS VE YALAMAYA DEVAM ET!'",
      "2 laz kuş avlamadaymış...\nbiri 'niye avlanamıyoz' diye dert yanmış...\nöbürü: 'BENCE KÖPEĞİ DAHA YUKARI ATMALIYIZ!",
      "bir grup laz yürüyen merdivenle çıkarken\nelektrikler kesilmiş...\n2 saat süreyle mahsur kalmışlar!!!",
      "30 yaşındaki bir Alman koskoca bir uçağı...\ntek eliyle kaldırmış..\nadam PİLOTMUŞ lan PİLOT!",
      "Temelle Dursun soygundadırlar...\nkaçarlarken polis arkalarından bağırır:\n'DUR KAÇMA OROSPU ÇOCUĞU!!'\nTemel Dursun'a dönerek:\n'Sen kaç! beni tanıdı!'",
    ];

    let jokeIndex;
    do {
      jokeIndex = Math.floor(Math.random() * jokes.length);
    } while (jokeIndex === this.previousJoke);

    this.previousJoke = jokeIndex;
    return jokes[jokeIndex];
  }

  // Gülme efekti
  getLaugh() {
    const laughs = [
      "eki!eki!eki! köh!köh!köh! ayy nekadar neşeliyim!!",
      "neee? hahhahahahhahhhhayyyy!! kafadan kopardım gene!!   hehe!",
      "kah!keh!koh!küh! hahahahaha!!! hihihihi!! ve de hohoho!",
      "he he he he...",
      "hahahaha!! ay ben ölmiiim emi!",
    ];
    return this.getRandomResponse(laughs);
  }

  // Küfür sistemi
  getCurse() {
    const curses = [
      "EEE! mına korum böyle oyunun!! yıkıl köpek!",
      "bana bak! seni adam yerine koyduk karşımıza aldık,.. tööbe tööbee",
      "OHA! OHA! kırsaydın klavyeyi!!",
      "doğru oyna orospu!",
      "GÖT!",
      "Vay hayvan seni!",
      "Çüşşşş öküz lazım olur o klavye sana",
    ];

    // Orijinal sistemdeki gibi rastgele kombinasyon
    return curses.filter(() => Math.random() < 0.5).join("\n");
  }

  // Geri zekalı taklidi
  getStupidResponse() {
    if (Math.random() < 0.5) {
      return (
        "\ngeri zekalı taklidi yap bakiim...\nTamam tamam bukadar yeter!!!\n" +
        this.getLaugh()
      );
    }
    return "";
  }

  // Yaş aşaması
  async processStage2(terminal, input) {
    const age = parseInt(input);
    this.userData.age = age;

    if (age <= 4) {
      await terminal.writeLine(
        "çok küçükmüşsün be! sen git anan gelsin lan lavuk!"
      );
      return "kaç yaşındasın?"; // Tekrar sor
    } else if (age >= 5 && age <= 9) {
      await terminal.writeLine("sütünü içtin mi yavrum?");
      this.currentStage = 2.1;
      return "(e/h)?";
    } else if (age >= 10 && age <= 17) {
      await terminal.writeLine(
        "iyi iyi 18ine pek bişi kalmamış... Uyu da büyü!"
      );
      this.currentStage = 3;
      return "boyun kaç cm senin?";
    } else if (age >= 18 && age <= 24) {
      await terminal.writeLine("Oy kullancanmı genç?");
      this.currentStage = 2.2;
      return "(e/h)?";
    } else if (age >= 25 && age <= 39) {
      await terminal.writeLine(
        "vayy! naber morruk? Nerde eski programcılar dimi mirim?"
      );
      this.currentStage = 3;
      return "boyun kaç cm senin?";
    } else if (age >= 40 && age <= 59) {
      await terminal.writeLine(
        "Yuh! bayağı yaşlısın... yaşlılar muhattabım diil, diyeceğimi sanıyorsun, yanılıyorsun pis cüce!"
      );
      this.currentStage = 3;
      return "boyun kaç cm senin?";
    } else if (age >= 60 && age <= 98) {
      await terminal.writeLine(
        "Ulan bunak! Klavyeyi nası görüyon? Geber de helvanı yiyelim. hehehe!"
      );
      this.currentStage = 3;
      return "boyun kaç cm senin?";
    } else if (age >= 99) {
      await terminal.writeLine("Kafa bulma lan göt");
      return "kaç yaşındasın?"; // Tekrar sor
    }
  }

  // Yaş alt aşamaları
  async processStage2_1(terminal, input) {
    // 5-9 yaş süt cevabı
    const answer = input.toLowerCase();
    if (answer === "e") {
      await terminal.writeLine(
        "Beynine pek etkisi olmamış, git biraz da PEPSı iç!"
      );
    } else if (answer === "h") {
      await terminal.writeLine("bok iç o zaman!");
    }
    this.currentStage = 3;
    return "boyun kaç cm senin?";
  }

  async processStage2_2(terminal, input) {
    // 18-24 yaş oy cevabı
    const answer = input.toLowerCase();
    if (answer === "e") {
      await terminal.writeLine("ver de gör ebeninkini!");
    } else if (answer === "h") {
      await terminal.writeLine(
        "Ulan sen ne biçim Tee.Cee vatandaşısın? Hayvan!..."
      );
    }
    this.currentStage = 3;
    return "boyun kaç cm senin?";
  }

  // Boy aşaması
  async processStage3(terminal, input) {
    const height = parseInt(input);
    this.userData.height = height;

    if (height <= 99) {
      await terminal.writeLine("Deden pigmelerin hangi kavminden lan?");
      this.currentStage = 4;
      return "oldu olcak kilonu da söyle bari... çok umurumda ya...";
    } else if (height >= 100 && height <= 149) {
      await terminal.writeLine(
        "Kısa boylu olman önemli diil, diyeceğimi sanıyorsun, yanılıyorsun pis cüce!"
      );
      this.currentStage = 4;
      return "oldu olcak kilonu da söyle bari... çok umurumda ya...";
    } else if (height >= 150 && height <= 169) {
      await terminal.writeLine(
        "Bacaklarına biraz gübre ektir. Faydası olur. kah!kih!koh!"
      );
      this.currentStage = 4;
      return "oldu olcak kilonu da söyle bari... çok umurumda ya...";
    } else if (height >= 170 && height <= 189) {
      await terminal.writeLine("iyi... bana ne... sorduk mu?!");
      this.currentStage = 4;
      return "oldu olcak kilonu da söyle bari... çok umurumda ya...";
    } else if (height >= 190 && height <= 209) {
      await terminal.writeLine("Oha! fasülye sırığı!");
      this.currentStage = 4;
      return "oldu olcak kilonu da söyle bari... çok umurumda ya...";
    } else if (height >= 210) {
      await terminal.writeLine("Yok deve!! kaç santim dedik, milim demedik!");
      return "boyun kaç cm senin?"; // Tekrar sor
    }
  }

  // Kilo aşaması
  async processStage4(terminal, input) {
    const weight = parseInt(input);
    this.userData.weight = weight;

    if (weight <= 39) {
      await terminal.writeLine("Rüzgarlı havada dışarı falan çıkma hehehe!");
      await terminal.writeLine(this.getStupidResponse());
    } else if (weight >= 40 && weight <= 59) {
      await terminal.writeLine(
        "o kadar yemiş yersen ishal de olursun, kabız da!"
      );
      await terminal.writeLine(this.getStupidResponse());
    } else if (weight >= 60 && weight <= 79) {
      await terminal.writeLine(
        "sen normalsin o yüzden dalga geçmiicem... noormaal! noormaal! hehehe!!"
      );
      await terminal.writeLine(this.getStupidResponse());
    } else if (weight >= 80 && weight <= 99) {
      const responses = [
        "Lütfen, oturduğun koltuk sağlam kalsın!",
        "Maaşşallaaah! damızlıkmısın? hangi çiftlikte yetiştin? keh!keh!keh!!.",
        "Duba! dikkat et benim üstüme düşme!",
      ];
      await terminal.writeLine(this.getRandomResponse(responses));
      await terminal.writeLine(this.getStupidResponse());
    } else if (weight >= 100) {
      await terminal.writeLine(
        "Anlamıştım... 2 saattir klavyenin anasını ağlattın"
      );
      await terminal.writeLine(this.getStupidResponse());
    }

    this.currentStage = 5;
    return "neyse... " + this.userData.name + " bi sayı tut.\ntuttunmu?\n(e/h)";
  }

  async processInput(terminal, input) {
    if (!input) return;

    switch (this.currentStage) {
      case 0:
        return await this.processStage0(terminal, input);
      case 1:
        return await this.processStage1(terminal, input);
      case 2:
        return await this.processStage2(terminal, input);
      case 2.1:
        return await this.processStage2_1(terminal, input);
      case 2.2:
        return await this.processStage2_2(terminal, input);
      case 3:
        return await this.processStage3(terminal, input);
      case 4:
        return await this.processStage4(terminal, input);
      default:
        return "Bir hata oluştu...";
    }
  }

  // Aşama işleyicileri
  async processStage0(terminal, input) {
    if (input) {
      // Eğer input varsa (kullanıcı isim girdiyse), direkt stage1'e geç
      this.currentStage = 1;
      return await this.processStage1(terminal, input);
    }
    // İlk açılışta buraya düşmeyecek, welcomeMessage'da soru sorulacak
    return "";
  }

  async processStage1(terminal, input) {
    this.userData.name = input.trim();
    const nameLength = input.replace(/\s/g, "").length;

    if (nameLength <= 2) {
      await terminal.writeLine(
        `Uzak doğudan mısın yoksa başka bir gezegenden mi?\n${nameLength} harfli ismini biraz zor telafuz ediyorum da...\n%c...\n%ch%s!!!\neee.. olmadı galiba... hehehehehee!`
      ); // "+ say(isim), isim[0], isim[0],isim +"
    } else if (nameLength >= 8) {
      await terminal.writeLine(
        "maaşşallaaaah!\nnüfus memuru ananı babanı pek sevmiyormuş galiba!!!"
      );
      await terminal.writeLine(this.getLaugh());
    }

    await terminal.writeLine(`${input}...`);
    this.currentStage = 2;
    return "kaç yaşındasın?";
  }

  // Geri zekalı taklidi
  getStupidResponse() {
    if (Math.random() < 0.5) {
      return (
        "\ngeri zekalı taklidi yap bakiim...\nTamam tamam bukadar yeter!!!\n" +
        this.getLaugh()
      );
    }
    return "";
  }
}

class Terminal {
  constructor() {
    this.outputElement = document.getElementById("output");
    this.inputElement = document.getElementById("command-input");
    this.promptElement = document.getElementById("input-prompt");
    this.inputLine = document.getElementById("input-line");
    this.bootSequence = document.getElementById("boot-sequence");
    this.terminalContent = document.getElementById("terminal-content");
    this.keySound = document.getElementById("keySound");
    this.typeWriter = new TypeWriter();
    this.history = [];
    this.historyIndex = -1;
    this.isProcessing = false;
    this.loaderElement = null;
    this.loadingLine = null;
    this.stageManager = new KarabasanStageManager();
    this.defaultSpeed = 30;

    this.init();
  }

  createLoader() {
    const line = document.createElement("div");
    line.className = "line";
    const loader = document.createElement("span");
    loader.className = "loader-line";
    line.appendChild(loader);
    this.outputElement.appendChild(line);
    this.loaderElement = line;
    this.scrollToBottom();
    return line;
  }

  removeLoader() {
    if (this.loaderElement && this.loaderElement.parentNode) {
      this.loaderElement.parentNode.removeChild(this.loaderElement);
      this.loaderElement = null;
    }
  }

  async init() {
    // BIOS boot sequence'i bekle
    await this.sleep(4000);

    // Boot sequence'i gizle
    this.bootSequence.style.display = "none";

    // Terminal içeriğini göster
    this.terminalContent.classList.add("visible");
    await this.sleep(500); // Fade-in animasyonunu bekle

    // Terminal'i başlat
    await this.welcomeMessage();
    this.setupEventListeners();

    // Input line'ı göster
    this.showInputLine();
  }

  async welcomeMessage() {
    const messages = [
      { text: ">> SİSTEME İZİNSİZ GİRİŞ TESPİT EDİLDİ <<", style: "alert" },
      { text: ">> GÜVENLİK PROTOKOLLERİ DEVRE DIŞI <<", style: "alert" },
      { text: ">> KARABASAN.EXE BAŞLATILIYOR <<", style: "alert" },
      { text: "", style: "normal" }
    ];

    // İlk uyarı mesajları
    for (const message of messages) {
      await this.writeLine(message.text, { style: message.style });
    }

    // Yükleniyor mesajı
    const loadingLine = document.createElement("div");
    loadingLine.className = "line";
    loadingLine.textContent = "Sistem yükleniyor...";
    this.outputElement.appendChild(loadingLine);
    this.loadingLine = loadingLine;

    // Dramatik bekleme
    await this.sleep(2000);

    // Yükleniyor mesajını kaldır
    if (this.loadingLine) {
      this.loadingLine.remove();
      this.loadingLine = null;
    }

    // Tehditkar karşılama ve ilk soru
    await this.writeLine("Sonunda geldin...");
    await this.sleep(1000);
    await this.writeLine("Seni bekliyordum...");
    await this.sleep(1000);
    await this.writeLine("Kaçış yok!");
    await this.sleep(500);
    await this.writeLine("Adın ne senin?");
  }

  setupEventListeners() {
    // Global klavye olaylarını dinle
    document.addEventListener("keydown", (e) => {
      if (this.isProcessing) return;

      // Eğer bir metin seçili değilse ve terminal aktifse
      if (
        !window.getSelection().toString() &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        // Özel tuşları yoksay
        if (
          ![
            "Tab",
            "Escape",
            "CapsLock",
            "Shift",
            "Control",
            "Alt",
            "Meta",
            "ContextMenu",
          ].includes(e.key)
        ) {
          this.inputElement.focus();
        }
      }
    });

    // Enter tuşu ve history navigasyonu için event listener
    this.inputElement.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const command = this.inputElement.textContent.trim().toLowerCase();
        if (command && !this.isProcessing) {
          this.inputElement.textContent = "";
          if (command) {
            this.history.unshift(command);
            this.historyIndex = -1;
            this.processCommand(command);
          }
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.navigateHistory("up");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        this.navigateHistory("down");
      }
    });

    // Her tuş vuruşunda ses çal
    this.inputElement.addEventListener("keypress", () => {
      this.playKeySound();
    });

    // Paste işlemini temizle
    this.inputElement.addEventListener("paste", (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
    });

    // Terminal tıklandığında input'a focus
    document.addEventListener("click", (e) => {
      // Eğer seçili metin varsa, focus'u engelleme
      if (window.getSelection().toString()) return;

      // Eğer işlem devam ediyorsa focus'u engelle
      if (this.isProcessing) return;

      // Input'un kendisine veya içeriğine tıklanmadıysa
      if (
        e.target !== this.inputElement &&
        !this.inputElement.contains(e.target)
      ) {
        this.inputElement.focus();
      }
    });
  }

  playKeySound() {
    if (!this.keySound) return;

    // Ses efektini baştan başlat ve çal
    this.keySound.currentTime = 0;
    this.keySound.volume = 0.2; // Sesi biraz kıs

    this.keySound.play().catch(() => {
      // Tarayıcı otomatik ses çalmaya izin vermiyorsa sessizce devam et
    });
  }

  hideInputLine() {
    this.inputLine.classList.add("hidden");
    this.inputElement.contentEditable = "false";
  }

  showInputLine() {
    this.inputLine.classList.remove("hidden");
    this.inputElement.contentEditable = "true";
    this.inputElement.focus();
    this.scrollToBottom();
  }

  navigateHistory(direction) {
    if (direction === "up" && this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
    } else if (direction === "down" && this.historyIndex > -1) {
      this.historyIndex--;
    }

    this.inputElement.textContent =
      this.historyIndex >= 0 ? this.history[this.historyIndex] : "";
    // İmleci sona taşı
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(this.inputElement);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  async processCommand(command) {
    this.hideInputLine();

    // Sadece kullanıcı komutunu göster
    const commandLine = document.createElement("div");
    commandLine.className = "line";
    commandLine.textContent = command;
    this.outputElement.appendChild(commandLine);
    this.scrollToBottom();

    this.isProcessing = true;

    // Rastgele işlem yapıyor efekti
    if (Math.random() < 0.3) {
      // %30 olasılıkla
      document.body.classList.add("terminal-busy");
      this.createLoader(); // Loader'ı oluştur
      await this.sleep(Math.random() * 2000 + 1000); // 1-3 saniye arası bekle
      this.removeLoader(); // Loader'ı kaldır
      document.body.classList.remove("terminal-busy");
    }

    // Komut işlenirken ekranı titre
    document.body.classList.add("glitch");
    await this.sleep(100);
    document.body.classList.remove("glitch");

    // Komut işleme
    const response = await this.stageManager.processInput(this, command);
    if (response) {
      await this.writeLine(response);
    }

    this.isProcessing = false;
    this.showInputLine();
  }

  async writeLine(text, options = {}) {
    const { style = "normal" } = options;

    const line = document.createElement("div");
    line.className = "line";

    if (style === "alert") {
      line.classList.add("system-alert");
      line.textContent = text;
      this.outputElement.appendChild(line);

      // Flash efekti için
      setTimeout(() => {
        line.classList.add("flash");
        setTimeout(() => {
          line.classList.remove("flash");
        }, 100);
      }, 100);
    } else {
      this.outputElement.appendChild(line);
      await this.typeWriter.type(text, line, {
        minSpeed: 20,
        maxSpeed: 50,
        mistakeProbability: 0.03,
        pauseProbability: 0.1,
        pauseMaxDuration: 500,
      });
    }

    this.scrollToBottom();
  }

  async typeWriter(text, line) {
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      line.textContent += char;

      // Her karakter eklendiğinde scroll
      this.scrollToBottom();

      // Yazma hızı ve hata simülasyonu
      if (char !== " ") {
        // Rastgele yazım hatası
        if (Math.random() < 0.05) {
          // %5 ihtimalle hata yap
          const wrongChar = String.fromCharCode(
            char.charCodeAt(0) + (Math.random() > 0.5 ? 1 : -1)
          );
          line.textContent += wrongChar;
          await this.sleep(this.defaultSpeed);
          line.textContent = line.textContent.slice(0, -1);
        }

        // Rastgele duraklama
        if (Math.random() < 0.1) {
          // %10 ihtimalle duraklama
          await this.sleep(this.defaultSpeed * 3);
        }

        await this.sleep(this.defaultSpeed);
      }
    }
  }

  scrollToBottom() {
    const terminalContent = document.getElementById('terminal-content');
    if (terminalContent) {
      terminalContent.scrollTop = terminalContent.scrollHeight;
    }
  }

  clear() {
    this.outputElement.innerHTML = "";
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Temel komutlar
  basicCommands = {
    yardim: async function () {
      const helpText = [
        { text: "Kullanılabilir komutlar:", style: "normal" },
        { text: "", style: "normal" },
        { text: "  yardim    - Bu yardım mesajını gösterir", style: "normal" },
        { text: "  temizle   - Ekranı temizler", style: "normal" },
        {
          text: "  cik       - Terminali kapatır (ya da kapatır mı?)",
          style: "normal",
        },
        { text: "  hakkinda  - Karabasan hakkında bilgi", style: "normal" },
        { text: "", style: "normal" },
        { text: "Özel Komutlar:", style: "normal" },
        { text: "  sayitahmin - Sayı tahmin oyunu", style: "normal" },
        { text: "  zar        - Zar at", style: "normal" },
        { text: "  sifre      - Rastgele şifre üret", style: "normal" },
        { text: "", style: "normal" },
      ];

      for (const line of helpText) {
        await this.writeLine(line.text, { style: line.style });
      }
    },

    temizle: function () {
      this.clear();
    },

    cik: async function () {
      await this.handleExit();
    },

    hakkinda: async function () {
      const aboutText = [
        { text: "Karabasan Terminal v2.0", style: "normal" },
        { text: "------------------------", style: "normal" },
        {
          text: "90'ların efsane DOS programı Karabasan'ın modern versiyonu.",
          style: "normal",
        },
        {
          text: "Benimle konuşabilir, sohbet edebilir veya... başına gelecekleri bekleyebilirsin.",
          style: "normal",
        },
        { text: "", style: "normal" },
      ];

      for (const line of aboutText) {
        await this.writeLine(line.text, { style: line.style });
      }
    },
  };

  // Özel komutlar
  specialCommands = {
    sayitahmin: async function () {
      const number = Math.floor(Math.random() * 100) + 1;
      let attempts = 0;
      const maxAttempts = 10;

      await this.writeLine("Hehe... 1-100 arası bir sayı tuttum...", {
        style: "normal",
      });
      await this.writeLine("10 hakkın var... Tahmin et bakalım...", {
        style: "normal",
      });

      // Oyun mantığı burada implemente edilecek
      // Şimdilik sadece sayıyı gösterelim
      await this.writeLine(`Debug: Tutulan sayı ${number}`, {
        style: "normal",
      });
    },

    zar: async function () {
      const dice1 = Math.floor(Math.random() * 6) + 1;
      const dice2 = Math.floor(Math.random() * 6) + 1;
      const total = dice1 + dice2;

      await this.writeLine("Zarlar havada...", { style: "normal" });
      await this.sleep(1000);
      await this.writeLine(` ${dice1} | ${dice2} `, { style: "normal" });
      await this.writeLine(`Toplam: ${total}`, { style: "normal" });

      if (total === 12) {
        await this.writeLine("ŞANSLISIN... bu sefer.", { style: "normal" });
      } else if (total === 2) {
        await this.writeLine("HAHAHA! Şanssız günündesin...", {
          style: "normal",
        });
      }
    },

    sifre: async function () {
      const length = 16;
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
      let password = "";

      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }

      await this.writeLine("Şifreni oluşturuyorum...", { style: "normal" });
      await this.sleep(500);
      await this.writeLine("İşte karanlık şifren:", { style: "normal" });
      await this.writeLine(password, { style: "normal" });
      await this.writeLine(
        "Ama dikkat et... Her şifrenin bir bedeli vardır...",
        { style: "normal" }
      );
    },
  };

  async karabasanResponse(input) {
    const responses = {
      merhaba: [
        "Hoş geldin kurban...",
        "Seni bekliyordum...",
        "Birlikte eğleneceğiz...",
      ],
      selam: ["Selamlar kurban...", "Sonunda geldin...", "Başlayalım mı?"],
      nasilsin: [
        "Ben her zamanki gibiyim...",
        "Ruhları avlıyorum...",
        "Sen nasılsın kurban?",
      ],
      iyiyim: ["Çok sevindim...", "Ama bu uzun sürmeyecek...", "Hehe..."],
      hastasin: [
        "Hasta değilim...",
        "Ben KARABASAN'ım...",
        "Ve sen benim kurbanımsın...",
      ],
      korktum: [
        "Daha yeni başlıyoruz...",
        "Korkacak çok şey var...",
        "Hehehe...",
      ],
    };

    // Rastgele bir yanıt seç
    let response;
    const inputLower = input.toLowerCase();

    if (responses[inputLower]) {
      response = responses[inputLower];
    } else {
      // Eğer tanımlı bir yanıt yoksa, rastgele korkutucu yanıtlar
      const randomResponses = [
        "Hehehe...",
        "Bu gece uyuyabilecek misin?",
        "Arkana baktın mı hiç?",
        "Yanındayım...",
        "Nefesimi hissediyor musun?",
        "Kaçış yok...",
        "Seni izliyorum...",
        "Karanlıktan korkuyor musun?",
      ];
      response = [
        randomResponses[Math.floor(Math.random() * randomResponses.length)],
      ];
    }

    // Yanıtları daha hızlı yaz
    for (const line of response) {
      await this.writeLine(line, {
        minSpeed: 15, // Daha hızlı minimum hız
        maxSpeed: 30, // Daha hızlı maximum hız
        mistakeProbability: 0.02, // Daha az hata
        pauseProbability: 0.05, // Daha az duraklama
        pauseMaxDuration: 300, // Daha kısa duraklamalar
      });
    }
  }
}

// Terminal'i başlat
document.addEventListener("DOMContentLoaded", () => {
  window.terminal = new Terminal();
});

jQuery(document).ready(function ($) {
  /* İnput 2 Echo */
  $("#input").keypress(function (e) {
    if (e.which == 13) {
      cevap = $("#input").val();
      if (cevap.length > 0) {
        echo(cevap);
        setTimeout(function () {
          $("#input").val("");
        }, 500);
      }
    }
  });

  /*Karabasan Diyalog Başla*/
  setTimeout(function () {
    asama0();
  }, 1000);
});
/* function: Echo */
function echo(param) {
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
0264	    	$("#echo").animate({scrollTop: $('#echo').prop("scrollHeight")});
	    		//}
	    	//}
	    },
	    callback: function (){
	    	$("#echo").animate({scrollTop: $('#echo').prop("scrollHeight")});
	    }
	  }
	)
*/
  var waitPulse = 500,
    waitPulseCarpan = 0.75;
  if (param.indexOf("\n") !== -1) {
    var str_array = param.split("\n");
    for (var i = 0; i < str_array.length; i++) {
      var Zamanlama = waitPulse * (waitPulseCarpan * i + 1);
      if (Zamanlama > 1000) {
        Zamanlama = waitPulse;
      }
      $("#echo")
        .append(str_array[i].replace("\n", "") + "\n")
        .animate({ scrollTop: $("#echo").prop("scrollHeight") }, Zamanlama);
    }
  } else {
    $("#echo")
      .append(param + "\n")
      .animate({ scrollTop: $("#echo").prop("scrollHeight") }, 1);
  }

  //$("#echo").append( param + '\n').animate({scrollTop: $('#echo').prop("scrollHeight")}, 1);
  //console.log('echo : '+ param);
}

/* function: Random Üreteç*/
function karistir(max) {
  var sonuc = Math.floor(Math.random() * max) + 1;
  return sonuc;
}

/* function: Karakter Sayıcı */
function say(veri) {
  var param = veri.length;
  console.log("say : " + param);
  return param;
}

/* array: adinNerdenGeliyor */
var adinNerdenGeliyor = [
  "",
  "üüüü! baya uzaktan geliyomuş!",
  "hadi canım, atıyorsun..\no kadar uzaktan mı geliyor ?",
  "at yalanı sksinler inananı..",
  "sen şimdi bununla piyasada yapıyorsundur, bence kimse yemez..",
];
var ogrencimisin = [
  "",
  "nerde öğrencisin? okulda mı??\nhihohohohhohohooo!!!\nespri konuşlandırdım!!",
  "wah! wah! wah! çok üzüldüm..\nailenin haberi varmı?\nha!haha!!hohoho!!!",
];
var fikralar = [
  "",
  "adamın biri soğuk çay istemiş...\nçaycı çayı getirmiş...\nadam da 'ISIT DA İÇELİM KARDEŞİM!' demiş!",
  "küçük kız babasına sormuş:\n'baba sapık ne demek?'\nbabası da 'SUS VE YALAMAYA DEVAM ET!'",
  "2 laz kuş avlamadaymış...\nbiri 'niye avlanamıyoz' diye dert yanmış...\nöbürü: 'BENCE KÖPEĞİ DAHA YUKARI ATMALIYIZ!",
  "bir grup laz yürüyen merdivenle çıkarken\nelektrikler kesilmiş...\n2 saat süreyle mahsur kalmışlar!!!",
  "30 yaşındaki bir Alman koskoca bir uçağı...\ntek eliyle kaldırmış..\nadam PİLOTMUŞ lan PİLOT!",
  "Temelle Dursun soygundadırlar...\nkaçarlarken polis arkalarından bağırır:\n'DUR KAÇMA OROSPU ÇOCUĞU!!'\nTemel Dursun'a dönerek:\n'Sen kaç! beni tanıdı!'",
];
var gulmeler = [
  "",
  "eki!eki!eki! köh!köh!köh! ayy nekadar neşeliyim!!",
  "neee? hahhahahahhahhhhayyyy!! kafadan kopardım gene!!   hehe!",
  "kah!keh!koh!küh! hahahahaha!!! hihihihi!! ve de hohoho!",
  "he he he he...",
  "hahahaha!! ay ben ölmiiim emi!",
];
var gerizekalilar = [
  "",
  "geri zekalı taklidi yap bakiim...\nTamam tamam bukadar yeter!!!",
];
var sovmeler = [
  "",
  "EEE! mına korum böyle oyunun!! yıkıl köpek!",
  "bana bak! seni adam yerine koyduk karşımıza aldık,.. tööbe tööbee",
  "OHA! OHA! kırsaydın klavyeyi!!",
  "doğru oyna orospu!",
  "GÖT!",
  "Vay hayvan seni!",
  "Çüşşşş öküz lazım olur o klavye sana",
];
var atasozu = [
  "",
  "yani sakla samanı gelir zamanı.",
  "yani arkadaşlarımızı dikkatli seçmemiz lazım.",
  "buradan alınacak ders: Göte giren şemsiye açılmaz..",
];

/* function: Input Kontrol */
function inputControl(Durum) {
  $(".cevap").unbind("keypress");
  if (Durum == "eh") {
    $("#input").attr("maxlength", "1").attr("type", "text");
  } else if (Durum == "number") {
    $("#input").attr("maxlength", "3").attr("type", "number");
  } else {
    $("#input").attr("maxlength", "100").attr("type", "text");
  }
}

/* function: Fıkralama */
function fikra() {
  var randNum = karistir(fikralar.length - 1);
  if (oncekifikra == randNum) {
    return fikra();
  } else {
    console.log("fikra : " + randNum);
    oncekifikra = randNum;
    echo(fikralar[randNum]);
  }
}

/* function: Gülme */
function gul() {
  var randNum = karistir(gulmeler.length - 1);
  if (oncekigul == randNum) {
    return gul();
  } else {
    oncekigul = randNum;
    echo(gulmeler[randNum]);
  }
}

/* function: Gerizekalılama */
function gerizekali() {
  if (karistir(2) == 1) {
    echo(gerizekalilar[0]);
  }
}

/* function: Sövme */
function sov() {
  var r1 = karistir(2);
  var r2 = karistir(2);
  var r3 = karistir(2);
  var r4 = karistir(2);
  var r5 = karistir(2);
  if (r1 == 1) {
    echo(sovmeler[1]);
  }
  if (r2 == 1) {
    echo(sovmeler[2]);
  }
  if (r3 == 1) {
    echo(sovmeler[3]);
  }
  if (r4 == 1) {
    echo(sovmeler[4]);
  }
  if (r5 == 1) {
    echo(sovmeler[5]);
  }
}

/* function: Sesli Harf Ayıklama */
function sesliharf(harf) {
  if (
    harf == "a" ||
    harf == "u" ||
    harf == "e" ||
    harf == "ı" ||
    harf == "ü" ||
    harf == "ö" ||
    harf == "i" ||
    harf == "o"
  ) {
    return 1;
  } else {
    return 0;
  }
}

/* function: Numerik Kontrolü */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/* AŞAMA BAŞLADI */
function asama0() {
  echo("merhaba\nben karabasan...\nsenin adın ne güzelim?");
  asama1();
}
/* AŞAMA BİTTİ */

/* AŞAMA BAŞLADI */
var asama1_step1 = false,
  asama1_step2 = false,
  asama1_step3 = false;
function asama1() {
  console.log("AŞAMA 1");
  if (asama1_step1 == false && asama1_step2 == false && asama1_step3 == false) {
    console.log("STEP 1");
    asama1_step1 = true;
    setTimeout("asama1()", 500);
    return;
  }

  if (asama1_step1 == true && asama1_step2 == false && asama1_step3 == false) {
    /*Cevap Alma*/
    inputControl("default");
    $(".cevap").focus();
    $(".cevap").keypress(function (e) {
      if (e.which == 13) {
        if ($("#input").val().length > 1) {
          asama1_step2 = true;
          isim = $("#input").val();
          $("#input").val("");
          echo("> " + isim);
          setTimeout("asama1()", 500);
        } else {
          //asama1();
        }
      }
    });
    /*Cevap Alma Bitti*/
    return;
  }

  if (asama1_step1 == true && asama1_step2 == true && asama1_step3 == false) {
    $(".cevap").unbind("keypress");
    console.log("STEP 3");

    if (say(isim) < 2) {
      echo(
        "Uzak doğudan mısın yoksa başka bir gezegenden mi?\n" +
          say(isim) +
          " harfli ismini biraz zor telafuz ediyorum da...\n%c...\n%ch%s!!!\neee.. olmadı galiba... hehehehehee!"
      ); // "+ say(isim), isim[0], isim[0],isim +"
    } else if (say(isim) > 8) {
      echo(
        "maaşşallaaaah!\nnüfus memuru ananı babanı pek sevmiyormuş galiba!!!"
      );
      gul();
    }

    asama1_step3 = true;
    setTimeout("asama1()", 500);
    return;
  }

  if (asama1_step1 == true && asama1_step2 == true && asama1_step3 == true) {
    setTimeout("asama2()", 500);
    return;
  }
}
/* AŞAMA BİTTİ */

/* AŞAMA BAŞLADI */
var asama2_step1 = false,
  asama2_step2 = false,
  asama2_step3 = false;
function asama2() {
  console.log("AŞAMA 2");
  if (asama2_step1 == false && asama2_step2 == false && asama2_step3 == false) {
    console.log("STEP 1");
    echo("" + isim + " kaç yaşındasın?");
    asama2_step1 = true;
    setTimeout("asama2()", 500);
    return;
  }

  if (asama2_step1 == true && asama2_step2 == false && asama2_step3 == false) {
    /*Cevap Alma*/
    inputControl("number");
    $(".cevap").focus();
    $(".cevap").keypress(function (e) {
      if (e.which == 13) {
        //if( isNumeric($("#input").val()) == true){
        if ($("#input").val().length > 0) {
          asama2_step2 = true;
          yas = $("#input").val();
          $("#input").val("");
          echo("> " + yas);
          setTimeout("asama2()", 500);
          return;
        }
      }
    });
    /*Cevap Alma Bitti*/
  }

  if (asama2_step1 == true && asama2_step2 == true && asama2_step3 == false) {
    if (isNumeric(yas) == false) {
      echo("Yaşını gir dedik mal!");
      asama2_step1 = false;
      asama2_step2 = false;
      setTimeout("asama2()", 500);
    } else {
      if (yas <= 4) {
        echo("çok küçükmüşsün be! sen git anan gelsin lan lavuk!");
        asama2_step3 = true;
        setTimeout("asama3()", 500);
      } else if (yas >= 5 && yas <= 9) {
        echo("sütünü içtin mi yavrum?\n(e/h)? ");
        /*Cevap Alma*/
        asama2_step_ek = true;
        inputControl("eh");
        $(".cevap").focus();
        $(".cevap").keypress(function (e) {
          if (e.which == 13) {
            if ($("#input").val() == "e" || $("#input").val() == "h") {
              asama2_step3 = true;
              secim = $("#input").val();
              $("#input").val("");
              echo("> " + secim);
              if (secim == "e") {
                echo("Beynine pek etkisi olmamış, git biraz da PEPSİ iç!");
              }
              if (secim == "h") {
                echo("bok iç o zaman!");
              }
              setTimeout("asama3()", 500);
            }
          }
        });
        return false;
        /*Cevap Alma Bitti*/
      } else if (yas >= 10 && yas <= 17) {
        echo("iyi iyi 18ine pek bişi kalmamış... Uyu da büyü!");
        asama2_step3 = true;
        setTimeout("asama3()", 500);
      } else if (yas >= 18 && yas <= 24) {
        echo("Oy kullancanmı genç?\n(e/h)? ");
        /*Cevap Alma*/
        asama2_step_ek = true;
        inputControl("eh");
        $(".cevap").focus();
        $(".cevap").keypress(function (e) {
          if (e.which == 13) {
            if ($("#input").val() == "e" || $("#input").val() == "h") {
              asama2_step3 = true;
              secim = $("#input").val();
              $("#input").val("");
              echo("> " + secim);
              if (secim == "e") {
                echo("ver de gör ebeninkini!");
              }
              if (secim == "h") {
                echo("Ulan sen ne biçim Tee.Cee vatandaşısın? Hayvan!...");
              }
              setTimeout("asama3()", 500);
            }
          }
        });
        return;
        /*Cevap Alma Bitti*/
      } else if (yas >= 25 && yas <= 39) {
        echo("vayy! naber morruk? Nerde eski programcılar dimi mirim?");
        asama2_step3 = true;
        setTimeout("asama3()", 500);
        return;
      } else if (yas >= 40 && yas <= 59) {
        echo(
          "Yuh! bayağı yaşlısın... yaşlılar muhattabım diil, diyeceğimi sanıyorsun, yanılıyorsun pis cüce!"
        );
        asama2_step3 = true;
        setTimeout("asama3()", 500);
        return;
      } else if (yas >= 60 && yas <= 98) {
        echo(
          "Ulan bunak! Klavyeyi nası görüyon? Geber de helvanı yiyelim. hehehe!"
        );
        asama2_step3 = true;
        setTimeout("asama3()", 500);
        return;
      } else if (yas >= 99) {
        echo("Kafa bulma lan göt");
        asama2_step1 = false;
        asama2_step2 = false;
        setTimeout("asama2()", 500);
        return;
      } else {
        $(".cevap").unbind("keypress");
        asama2_step3 = true;
        setTimeout("asama2()", 500);
        return;
      }
    }
    return;
  }

  if (
    asama2_step1 == true &&
    asama2_step2 == true &&
    asama2_step3 == false &&
    asama2_step_ek == false
  ) {
    console.log("STEP 4");
    setTimeout("asama3()", 500);
    return;
  }
}
/* AŞAMA BİTTİ */

/* AŞAMA BAŞLADI */
var asama3_step1 = false,
  asama3_step2 = false,
  asama3_step3 = false;
function asama3() {
  console.log("AŞAMA 3");
  if (asama3_step1 == false && asama3_step2 == false && asama3_step3 == false) {
    console.log("STEP 1");
    echo("boyun kaç cm senin?");
    asama3_step1 = true;
    setTimeout("asama3()", 500);
    return;
  }

  if (asama3_step1 == true && asama3_step2 == false && asama3_step3 == false) {
    /*Cevap Alma*/
    inputControl("number");
    $(".cevap").focus();
    $(".cevap").keypress(function (e) {
      if (e.which == 13) {
        //if( isNumeric($("#input").val()) == true){
        if ($("#input").val().length > 0) {
          asama3_step2 = true;
          boyu = $("#input").val();
          $("#input").val("");
          echo("> " + boyu);
          setTimeout("asama3()", 500);
          return;
        }
      }
    });
    /*Cevap Alma Bitti*/
  }

  if (asama3_step1 == true && asama3_step2 == true && asama3_step3 == false) {
    if (isNumeric(boyu) == false) {
      echo(
        "Salak boyunu harf ile mi yazıyorsun? sana matematik öğretmediler mi?"
      );
      asama3_step2 = false;
      setTimeout("asama3()", 500);
      return;
    } else {
      if (boyu <= 99) {
        echo("Deden pigmelerin hangi kavminden lan?");
        asama3_step3 = true;
        setTimeout("asama3()", 500);
        return;
      } else if (boyu >= 100 && boyu <= 149) {
        echo(
          "Kısa boylu olman önemli diil, diyeceğimi sanıyorsun, yanılıyorsun pis cüce!"
        );
        asama3_step3 = true;
        setTimeout("asama3()", 500);
        return;
      } else if (boyu >= 150 && boyu <= 169) {
        echo("Bacaklarına biraz gübre ektir. Faydası olur. kah!kih!koh!");
        asama3_step3 = true;
        setTimeout("asama3()", 500);
        return;
      } else if (boyu >= 170 && boyu <= 189) {
        echo("iyi... bana ne... sorduk mu?!");
        asama3_step3 = true;
        setTimeout("asama3()", 500);
        return;
      } else if (boyu >= 190 && boyu <= 209) {
        echo("Oha! fasülye sırığı!");
        asama3_step3 = true;
        setTimeout("asama3()", 500);
        return;
      } else if (boyu >= 210) {
        echo("Yok deve!! kaç santim dedik, milim demedik!");
        asama3_step1 = false;
        asama3_step2 = false;
        setTimeout("asama3()", 500);
        return;
      }
    }
    return;
  }

  if (asama3_step1 == true && asama3_step2 == true && asama3_step3 == true) {
    console.log("STEP 3");
    setTimeout("asama4()", 500);
    return;
  }
}
/* AŞAMA BİTTİ */

/* AŞAMA BAŞLADI */
var asama4_step1 = false,
  asama4_step2 = false,
  asama4_step3 = false;
function asama4() {
  console.log("AŞAMA 4");
  if (asama4_step1 == false && asama4_step2 == false && asama4_step3 == false) {
    console.log("STEP 1");
    echo("oldu olcak kilonu da söyle bari... çok umurumda ya...");
    asama4_step1 = true;
    setTimeout("asama4()", 500);
    return;
  }

  if (asama4_step1 == true && asama4_step2 == false && asama4_step3 == false) {
    /*Cevap Alma*/
    inputControl("number");
    $(".cevap").focus();
    $(".cevap").keypress(function (e) {
      if (e.which == 13) {
        //if( isNumeric($("#input").val()) == true){
        if ($("#input").val().length > 0) {
          asama4_step2 = true;
          kilo = $("#input").val();
          $("#input").val("");
          echo("> " + kilo);
          setTimeout("asama4()", 500);
          return;
        }
      }
    });
    /*Cevap Alma Bitti*/
  }

  if (asama4_step1 == true && asama4_step2 == true && asama4_step3 == false) {
    if (isNumeric(kilo) == false) {
      echo(
        "Salak boyunu harf ile mi yazıyorsun? sana matematik öğretmediler mi?"
      );
      asama4_step2 = false;
      setTimeout("asama4()", 500);
      return;
    } else {
      if (kilo <= 39) {
        echo("Rüzgarlı havada dışarı falan çıkma hehehe!");
        gerizekali();
        asama4_step3 = true;
        setTimeout("asama4()", 500);
        return;
      } else if (kilo >= 40 && kilo <= 59) {
        echo("o kadar yemiş yersen ishal de olursun, kabız da!");
        gerizekali();
        asama4_step3 = true;
        setTimeout("asama4()", 500);
        return;
      } else if (kilo >= 60 && kilo <= 79) {
        echo(
          "sen normalsin o yüzden dalga geçmiicem... noormaal! noormaal! hehehe!!"
        );
        gerizekali();
        asama4_step3 = true;
        setTimeout("asama4()", 500);
        return;
      } else if (kilo >= 80 && kilo <= 99) {
        var degis = karistir(3);
        console.log("Kilo Random: " + degis);
        if (degis == 0) {
          echo("Lütfen, oturduğun koltuk sağlam kalsın!");
        } else if (degis == 1) {
          echo(
            "Maaşşallaaah! damızlıkmısın? hangi çiftlikte yetiştin? keh!keh!keh!!."
          );
        } else if (degis == 2) {
          echo("Duba! dikkat et benim üstüme düşme!");
        }
        gerizekali();
        asama4_step3 = true;
        setTimeout("asama4()", 500);
        return;
      } else if (kilo >= 100) {
        echo("Anlamıştım... 2 saattir klavyenin anasını ağlattın");
        gerizekali();
        asama4_step3 = true;
        setTimeout("asama4()", 500);
        return;
      }
    }
  }

  if (asama4_step1 == true && asama4_step2 == true && asama4_step3 == true) {
    setTimeout("asama5()", 500);
    return;
  }
}
/* AŞAMA BİTTİ */

/* AŞAMA */
var asama5_step1 = false,
  asama5_step2 = false,
  asama5_step3 = false,
  asama5_step4 = false,
  asama5_step5 = false,
  asama5_step6 = false,
  asama5_step7 = false,
  asama5_step8 = false,
  asama5_step9 = false;
function asama5() {
  // ADIM 1
  if (
    asama5_step1 == false &&
    asama5_step2 == false &&
    asama5_step3 == false &&
    asama5_step4 == false &&
    asama5_step5 == false &&
    asama5_step6 == false &&
    asama5_step7 == false &&
    asama5_step8 == false &&
    asama5_step9 == false
  ) {
    echo(
      "" +
        isim +
        " sana gözlerinin çok güzel olduğunu söyleyen olmuşmuydu hiç\n(e/h)? "
    );
    /*Cevap Alma*/
    inputControl("eh");
    $(".cevap").focus();
    $(".cevap").keypress(function (e) {
      if (e.which == 13) {
        if ($("#input").val() == "e" || $("#input").val() == "h") {
          asama5_step1 = true;
          secim = $("#input").val();
          $("#input").val("");
          echo("> " + secim);
          if (secim == "e") {
            echo("yalan söylemiş!");
          }
          if (secim == "h") {
            echo("doğrudur. çünkü gözlerin güzel diil!");
          }
          gul();
          setTimeout("asama5()", 500);
          return;
        }
      }
    });
    return false;
    /*Cevap Alma Bitti*/
  }

  // ADIM 2
  if (
    asama5_step1 == true &&
    asama5_step2 == false &&
    asama5_step3 == false &&
    asama5_step4 == false &&
    asama5_step5 == false &&
    asama5_step6 == false &&
    asama5_step7 == false &&
    asama5_step8 == false &&
    asama5_step9 == false
  ) {
    echo("yavrum " + isim + " ayda 50 milyon kazanmak istermisin?\n(e/h)? ");
    /*Cevap Alma*/
    inputControl("eh");
    $(".cevap").focus();
    $(".cevap").keypress(function (e) {
      if (e.which == 13) {
        if ($("#input").val() == "e" || $("#input").val() == "h") {
          asama5_step2 = true;
          secim = $("#input").val();
          $("#input").val("");
          echo("> " + secim);
          if (secim == "e") {
            echo("o zaman Ay'a gitmen lazım...");
          }
          if (secim == "h") {
            echo("iyi... zaten Ay'da sağlıklı çalışabileceğini sanmıyordum.");
          }
          gul();
          setTimeout("asama5()", 500);
          return;
        }
      }
    });
    return false;
    /*Cevap Alma Bitti*/
  }

  // ADIM 3
  if (
    asama5_step1 == true &&
    asama5_step2 == true &&
    asama5_step3 == false &&
    asama5_step4 == false &&
    asama5_step5 == false &&
    asama5_step6 == false &&
    asama5_step7 == false &&
    asama5_step8 == false &&
    asama5_step9 == false
  ) {
    echo("" + isim + " adı nerden geliyo?");
    /*Cevap Alma*/
    inputControl("default");
    $(".cevap").focus();
    $(".cevap").keypress(function (e) {
      if (e.which == 13) {
        if ($("#input").val().length > 1) {
          asama5_step3 = true;
          secim = $("#input").val();
          $("#input").val("");
          echo("> " + secim);
          echo(adinNerdenGeliyor[karistir(adinNerdenGeliyor.length - 1)]);
          gul();
          setTimeout("asama5()", 500);
          return;
        }
      }
    });
    return;
    /*Cevap Alma Bitti*/
  }

  // ADIM 4
  if (
    asama5_step1 == true &&
    asama5_step2 == true &&
    asama5_step3 == true &&
    asama5_step4 == false &&
    asama5_step5 == false &&
    asama5_step6 == false &&
    asama5_step7 == false &&
    asama5_step8 == false &&
    asama5_step9 == false
  ) {
    echo("neyse... " + isim + " bi sayı tut.\ntuttunmu?\n(e/h)");
    /*Cevap Alma*/
    inputControl("eh");
    $(".cevap").focus();
    $(".cevap").keypress(function (e) {
      if (e.which == 13) {
        if ($("#input").val() == "e" || $("#input").val() == "h") {
          asama5_step4 = true;
          secim = $("#input").val();
          $("#input").val("");
          echo("> " + secim);
          if (secim == "e") {
            echo("şimdi de bırak!");
          }
          if (secim == "h") {
            echo("bi sayıyı tutamadın allah belanı versin");
          }
          gul();
          setTimeout("asama5()", 500);
          return;
        }
      }
    });
    return;
    /*Cevap Alma Bitti*/
  }

  // ADIM 5
  if (
    asama5_step1 == true &&
    asama5_step2 == true &&
    asama5_step3 == true &&
    asama5_step4 == true &&
    asama5_step5 == false &&
    asama5_step6 == false &&
    asama5_step7 == false &&
    asama5_step8 == false &&
    asama5_step9 == false
  ) {
    if (
      isim[1] == "a" ||
      isim[1] == "e" ||
      isim[1] == "o" ||
      isim[1] == "ö" ||
      isim[1] == "ı" ||
      isim[1] == "i" ||
      isim[1] == "u" ||
      isim[1] == "ü"
    ) {
      echo(
        "" +
          isim +
          " sana kısaca " +
          isim.substr(0, 3) +
          "coş diyebilirmiyim??\n(e/h)"
      );
    } else {
      echo(
        "" +
          isim +
          " sana kısaca " +
          isim.substr(0, 2) +
          "oş diyebilirmiyim??\n(e/h)"
      );
    }
    /*Cevap Alma*/
    inputControl("eh");
    $(".cevap").focus();
    $(".cevap").keypress(function (e) {
      if (e.which == 13) {
        if ($("#input").val() == "e" || $("#input").val() == "h") {
          asama5_step5 = true;
          secim = $("#input").val();
          $("#input").val("");
          echo("> " + secim);
          if (secim == "e") {
            echo("iyi... ama ben demek istemiyorum!");
          }
          if (secim == "h") {
            if (
              isim[1] == "a" ||
              isim[1] == "e" ||
              isim[1] == "o" ||
              isim[1] == "ö" ||
              isim[1] == "ı" ||
              isim[1] == "i" ||
              isim[1] == "u" ||
              isim[1] == "ü"
            ) {
              echo(
                "" +
                  isim.substr(0, 3) +
                  "coş! " +
                  isim.substr(0, 3) +
                  "coş! " +
                  isim.substr(0, 3) +
                  "coş!"
              );
            } else {
              echo(
                "" +
                  isim.substr(0, 2) +
                  "oş! " +
                  isim.substr(0, 2) +
                  "oş! " +
                  isim.substr(0, 2) +
                  "oş!"
              );
            }
          }
          gul();
          setTimeout("asama5()", 500);
          return;
        }
      }
    });

    $("#input").val("");
    return;
    /*Cevap Alma Bitti*/
  }

  // ADIM 6
  if (
    asama5_step1 == true &&
    asama5_step2 == true &&
    asama5_step3 == true &&
    asama5_step4 == true &&
    asama5_step5 == true &&
    asama5_step6 == false &&
    asama5_step7 == false &&
    asama5_step8 == false &&
    asama5_step9 == false
  ) {
    echo("nasılsınız lan " + isim + " ?\niyimisin ki\n(e/h)");
    /*Cevap Alma*/
    inputControl("eh");
    $(".cevap").focus();
    $(".cevap").keypress(function (e) {
      if (e.which == 13) {
        if ($("#input").val() == "e" || $("#input").val() == "h") {
          asama5_step6 = true;
          secim = $("#input").val();
          echo("> " + secim);
          if (secim == "e") {
            var rand6 = karistir(3);
            if (rand6 == 0) {
              echo(
                "niye iyisin? oturduğun yere bir bak bakiim...\njoysitick falan unutmuş olmasınlar?"
              );
              setTimeout("asama5()", 500);
              return;
            } else if (rand6 == 1) {
              echo(
                "iyi iyi... sen iyi olmaya devam et " + isim + "!\nuyu da büyü!"
              );
              setTimeout("asama5()", 500);
              return;
            } else if (rand6 == 2) {
              echo(
                "böyle bir hayatta nasıl iyi oluyorsunuz ki lan " +
                  isim +
                  "?\nbize de söyle yolunu biz de iyi olalım.."
              );
              setTimeout("asama5()", 500);
              return;
            }
          }
          if (secim == "h") {
            var rand62 = karistir(3);
            if (rand62 == 1) {
              echo("bana ne lan! geber!");
              gul();
              setTimeout("asama5()", 500);
              return;
            } else if (rand62 == 2) {
              echo("iyi iyi allah kötülük versin! he he he !!");
              gul();
              setTimeout("asama5()", 500);
              return;
            } else if (rand62 == 0) {
              echo(
                "derdini anlat bana! açıl bana yavrucuum! utanma ben doktorum...\nKötü olmana sebep olan şey nedir?"
              );
              /*Cevap Alma*/
              inputControl("default");
              $(".cevap").focus();
              $(".cevap").keypress(function (e) {
                if (e.which == 13) {
                  if ($("#input").val().length > 1) {
                    secim2 = $("#input").val();
                    $("#input").val("");
                    echo("> " + secim);
                    echo(
                      "" +
                        secim2 +
                        "??\nhahahahahahahaha!!! git allasen yaw! dert  ettiğin şeye bak!"
                    );
                    gul();
                    setTimeout("asama5()", 500);
                    return;
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
  if (
    asama5_step1 == true &&
    asama5_step2 == true &&
    asama5_step3 == true &&
    asama5_step4 == true &&
    asama5_step5 == true &&
    asama5_step6 == true &&
    asama5_step7 == false &&
    asama5_step8 == false &&
    asama5_step9 == false
  ) {
    echo("neyse... " + isim + " öğrencimisin?\n(e/h)");
    /*Cevap Alma*/
    inputControl("eh");
    $(".cevap").focus();
    $(".cevap").keypress(function (e) {
      if (e.which == 13) {
        if ($("#input").val() == "e" || $("#input").val() == "h") {
          asama5_step7 = true;
          secim = $("#input").val();
          echo("> " + secim);
          if (secim == "e") {
            echo(ogrencimisin[karistir(ogrencimisin.length - 1)]);
            gul();
            setTimeout("asama5()", 500);
            return;
          }
          if (secim == "h") {
            var rand72 = karistir(2);
            if (rand72 == 1) {
              echo(
                "ulan insan en azından askerden yırtmak için öğrenci olur! Ama sen, tıss!"
              );
            } else if (rand72 == 2) {
              echo(
                "hangi işle meşgulsun o vakit?\n" +
                  isim +
                  " sana bir iş bulayım ben..."
              );
              /*Cevap Alma*/
              inputControl("default");
              $(".cevap").focus();
              $(".cevap").keypress(function (e) {
                if (e.which == 13) {
                  if ($("#input").val().length > 1) {
                    secim2 = $("#input").val();
                    $("#input").val("");
                    echo("> " + secim2);
                    echo(
                      "siktir lan göt! cümle alem senin ne mal olduğunu biliyor!."
                    );
                    gul();
                    setTimeout("asama5()", 500);
                    return;
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
  if (
    asama5_step1 == true &&
    asama5_step2 == true &&
    asama5_step3 == true &&
    asama5_step4 == true &&
    asama5_step5 == true &&
    asama5_step6 == true &&
    asama5_step7 == true &&
    asama5_step8 == false &&
    asama5_step9 == false
  ) {
    setTimeout("asama6()", 500);
    return;
  }
}
/* AŞAMA BİTTİ */

/* AŞAMA */
var asama6_step1 = false,
  asama6_step2 = false,
  asama6_step3 = false,
  asama6_step4 = false,
  asama6_step5 = false,
  asama6_step6 = false,
  asama6_step7 = false,
  asama6_step8 = false,
  asama6_step9 = false;
function asama6() {
  if (
    asama6_step1 == false &&
    asama6_step2 == false &&
    asama6_step3 == false &&
    asama6_step4 == false &&
    asama6_step5 == false &&
    asama6_step6 == false &&
    asama6_step7 == false &&
    asama6_step8 == false &&
    asama6_step9 == false
  ) {
    echo("bak sana şindi konuyla ilgili bir fıkra...");
    asama6_step1 = true;
    setTimeout("asama6()", 500);
    return;
  }
  if (
    asama6_step1 == true &&
    asama6_step2 == false &&
    asama6_step3 == false &&
    asama6_step4 == false &&
    asama6_step5 == false &&
    asama6_step6 == false &&
    asama6_step7 == false &&
    asama6_step8 == false &&
    asama6_step9 == false
  ) {
    fikra();
    asama6_step2 = true;
    setTimeout("asama6()", 500);
    return;
  }
  if (
    asama6_step1 == true &&
    asama6_step2 == true &&
    asama6_step3 == false &&
    asama6_step4 == false &&
    asama6_step5 == false &&
    asama6_step6 == false &&
    asama6_step7 == false &&
    asama6_step8 == false &&
    asama6_step9 == false
  ) {
    gul();
    asama6_step3 = true;
    setTimeout("asama6()", 500);
    return;
  }
  if (
    asama6_step1 == true &&
    asama6_step2 == true &&
    asama6_step3 == true &&
    asama6_step4 == false &&
    asama6_step5 == false &&
    asama6_step6 == false &&
    asama6_step7 == false &&
    asama6_step8 == false &&
    asama6_step9 == false
  ) {
    echo(atasozu[karistir(atasozu.length - 1)]);
    asama6_step4 = true;
    setTimeout("asama6()", 500);
    return;
  }
  if (
    asama6_step1 == true &&
    asama6_step2 == true &&
    asama6_step3 == true &&
    asama6_step4 == true &&
    asama6_step5 == false &&
    asama6_step6 == false &&
    asama6_step7 == false &&
    asama6_step8 == false &&
    asama6_step9 == false
  ) {
    gul();
    asama6_step5 = true;
    setTimeout("asama6()", 500);
    return;
  }
  if (
    asama6_step1 == true &&
    asama6_step2 == true &&
    asama6_step3 == true &&
    asama6_step4 == true &&
    asama6_step5 == true &&
    asama6_step6 == false &&
    asama6_step7 == false &&
    asama6_step8 == false &&
    asama6_step9 == false
  ) {
    asama6_step6 = true;
    setTimeout("asama7()", 500);
    return;
  }
}
/* AŞAMA BİTTİ */

/* AŞAMA */
function asama7() {}
/* AŞAMA BİTTİ */

/* AŞAMA */
function asama8() {}
/* AŞAMA BİTTİ */

/* AŞAMA */
function asama9() {}
/* AŞAMA BİTTİ */

/* AŞAMA */
function asama10() {}
/* AŞAMA BİTTİ */

/* TypeWrite plugin */
$.fn.extend({
  backspace: function (e, t) {
    var n;
    return (
      (n = $.extend(
        { callback: function () {}, keypress: function () {}, t: 100, e: 0.04 },
        t
      )),
      this.each(function () {
        var t;
        (t = this),
          $(t).queue(function () {
            var i, a;
            (a = function (e, i) {
              e
                ? ((t[/(np|x)/i.test(t.tagName) ? "value" : "innerHTML"] = t[
                    /(np|x)/i.test(t.tagName) ? "value" : "innerHTML"
                  ].slice(0, -1)),
                  n.keypress.call(t),
                  setTimeout(function () {
                    a(e - 1, i);
                  }, n.t))
                : (n.callback.call(t), $(t).dequeue());
            }),
              (i = function (e, a) {
                e
                  ? ((t[/(np|x)/i.test(t.tagName) ? "value" : "innerHTML"] +=
                      e[0]),
                    n.keypress.call(t),
                    setTimeout(function () {
                      i(e.slice(1), a);
                    }, n.t))
                  : a();
              }),
              a(e);
          });
      })
    );
  },
});
