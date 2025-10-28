document.addEventListener("DOMContentLoaded", () => {
  // ------------------ PARTICULAS ------------------
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let particlesArray = [];

  function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    for (let i = 0; i < 30; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,182,193,${p.opacity})`;
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener("resize", initParticles);
  initParticles();
  animateParticles();

  // ------------------ QUIZ ------------------
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const backBtn = document.getElementById("back-btn");

  const homeScreen = document.getElementById("home-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const endScreen = document.getElementById("end-screen");

  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const scoreText = document.getElementById("score-text");

  let currentQuestionIndex = 0;
  let score = 0;
  let shuffledQuestions = [];

  // ---------- PERGUNTAS ----------
  const easyQuestions = [
    {question:"Qual é o principal órgão do sistema reprodutor feminino?",answers:[
      {text:"Ovário",correct:false},{text:"Útero",correct:true},{text:"Vagina",correct:false},{text:"Trompa de Falópio",correct:false}]},
    {question:"Onde ocorre a fecundação no sistema reprodutor feminino?",answers:[
      {text:"No ovário",correct:false},{text:"No útero",correct:false},{text:"Nas trompas de Falópio",correct:true},{text:"Na vagina",correct:false}]},
    {question:"Qual é o nome da célula reprodutiva feminina?",answers:[
      {text:"Espermatozoide",correct:false},{text:"Óvulo",correct:true},{text:"Gameta masculino",correct:false},{text:"Zigoto",correct:false}]},
    {question:"Qual é a função dos ovários?",answers:[
      {text:"Produzir leite materno",correct:false},{text:"Produzir óvulos e hormônios femininos",correct:true},{text:"Proteger o bebê",correct:false},{text:"Ligar o útero à vagina",correct:false}]},
    {question:"Como se chama o canal que liga o útero ao meio externo?",answers:[
      {text:"Ovário",correct:false},{text:"Trompa",correct:false},{text:"Vagina",correct:true},{text:"Endométrio",correct:false}]},
    {question:"Qual é o hormônio responsável pelas características femininas?",answers:[
      {text:"Testosterona",correct:false},{text:"Adrenalina",correct:false},{text:"Estrogênio",correct:true},{text:"Insulina",correct:false}]},
    {question:"O que acontece durante a menstruação?",answers:[
      {text:"O óvulo é fecundado",correct:false},{text:"O útero elimina o endométrio",correct:true},{text:"O bebê começa a se formar",correct:false},{text:"Os ovários produzem leite",correct:false}]},
    {question:"O que são as trompas de Falópio?",answers:[
      {text:"Canais que ligam os ovários ao útero",correct:true},{text:"Partes externas da vulva",correct:false},{text:"Glândulas que produzem hormônios",correct:false},{text:"Revestimento do útero",correct:false}]},
    {question:"Qual é a função do útero durante a gravidez?",answers:[
      {text:"Produzir hormônios",correct:false},{text:"Eliminar o endométrio",correct:false},{text:"Acolher e nutrir o bebê",correct:true},{text:"Produzir óvulos",correct:false}]},
    {question:"Como se chama o processo em que o ovário libera um óvulo?",answers:[
      {text:"Fecundação",correct:false},{text:"Menstruação",correct:false},{text:"Ovulação",correct:true},{text:"Gestação",correct:false}]}
  ];

  const mediumQuestions = [
    {question:"Qual é a principal função do colo do útero (cérvix)?",answers:[
      {text:"Produzir óvulos",correct:false},{text:"Conectar o útero à vagina e controlar a passagem entre eles",correct:true},
      {text:"Armazenar espermatozoides",correct:false},{text:"Produzir hormônios",correct:false}]},
    {question:"Em qual parte do sistema reprodutor feminino ocorre, normalmente, a fecundação?",answers:[
      {text:"Útero",correct:false},{text:"Trompa de Falópio",correct:true},{text:"Vagina",correct:false},{text:"Ovário",correct:false}]},
    {question:"Qual é o nome da camada interna do útero que se renova a cada ciclo menstrual?",answers:[
      {text:"Endométrio",correct:true},{text:"Miométrio",correct:false},{text:"Epitélio",correct:false},{text:"Ovário",correct:false}]},
    {question:"O que é a puberdade nas meninas?",answers:[
      {text:"O momento em que o corpo começa a produzir leite",correct:false},{text:"A fase em que o corpo começa a desenvolver características adultas e capacidade reprodutiva",correct:true},
      {text:"O período da menopausa",correct:false},{text:"O processo de fecundação",correct:false}]},
    {question:"Qual hormônio é responsável por preparar o útero para uma possível gravidez após a ovulação?",answers:[
      {text:"Estrogênio",correct:false},{text:"Progesterona",correct:true},{text:"Testosterona",correct:false},{text:"Adrenalina",correct:false}]},
    {question:"O que acontece com o endométrio quando não há fecundação?",answers:[
      {text:"Ele se mantém espesso",correct:false},{text:"Ele se transforma em placenta",correct:false},{text:"Ele se rompe e é eliminado na menstruação",correct:true},{text:"Ele se transforma em um óvulo",correct:false}]},
    {question:"Como se chama o período em que a mulher para de menstruar definitivamente?",answers:[
      {text:"Ovulação",correct:false},{text:"Puberdade",correct:false},{text:"Menopausa",correct:true},{text:"Gestação",correct:false}]},
    {question:"Durante a ovulação, o que acontece com o óvulo liberado?",answers:[
      {text:"Ele se dirige às trompas de Falópio",correct:true},{text:"Ele vai direto para o útero",correct:false},{text:"Ele se transforma em um embrião",correct:false},{text:"Ele é eliminado na urina",correct:false}]},
    {question:"Qual das opções abaixo não faz parte do sistema reprodutor feminino?",answers:[
      {text:"Ovário",correct:false},{text:"Trompa de Falópio",correct:false},{text:"Próstata",correct:true},{text:"Útero",correct:false}]},
    {question:"Qual é a função dos ovários além de produzir óvulos?",answers:[
      {text:"Produzir hormônios femininos como estrogênio e progesterona",correct:true},{text:"Controlar os batimentos cardíacos",correct:false},{text:"Regular a respiração",correct:false},{text:"Armazenar o bebê durante a gravidez",correct:false}]}
  ];

  const hardQuestions = [
    {question:"Qual é a função principal do hormônio FSH (hormônio folículo-estimulante) no corpo feminino?",answers:[
      {text:"Estimular a ovulação diretamente",correct:false},{text:"Estimular o crescimento dos folículos ovarianos",correct:true},{text:"Engrossar o endométrio",correct:false},{text:"Controlar a temperatura corporal",correct:false}]},
    {question:"Qual hormônio é responsável por causar a ovulação quando atinge seu pico no ciclo menstrual?",answers:[
      {text:"Estrogênio",correct:false},{text:"Progesterona",correct:false},{text:"LH (hormônio luteinizante)",correct:true},{text:"FSH",correct:false}]},
    {question:"Durante o ciclo menstrual, em qual fase o endométrio está mais espesso e preparado para uma possível gestação?",answers:[
      {text:"Fase menstrual",correct:false},{text:"Fase proliferativa",correct:false},{text:"Fase secretora",correct:true},{text:"Fase folicular",correct:false}]},
    {question:"O corpo lúteo é uma estrutura formada após a ovulação. Qual é a sua função principal?",answers:[
      {text:"Produzir estrogênio e progesterona",correct:true},{text:"Transportar o óvulo até o útero",correct:false},{text:"Eliminar o endométrio",correct:false},{text:"Armazenar espermatozoides",correct:false}]},
    {question:"O que acontece se o óvulo for fecundado?",answers:[
      {text:"É eliminado pela menstruação",correct:false},{text:"Se fixa no endométrio e inicia a gravidez",correct:true},{text:"Transforma-se em outro hormônio",correct:false},{text:"Dissolve-se nas trompas",correct:false}]},
    {question:"Qual estrutura conecta o ovário ao útero e é o local mais comum da fecundação?",answers:[
      {text:"Colo do útero",correct:false},{text:"Trompa de Falópio",correct:true},{text:"Endométrio",correct:false},{text:"Vagina",correct:false}]},
    {question:"O que caracteriza a menopausa no organismo feminino?",answers:[
      {text:"Aumento da produção de estrogênio",correct:false},{text:"Fim da liberação de óvulos e queda na produção hormonal",correct:true},{text:"Início da ovulação",correct:false},{text:"Formação do corpo lúteo",correct:false}]},
    {question:"O que acontece com os níveis de estrogênio e progesterona durante a menstruação?",answers:[
      {text:"Aumentam muito",correct:false},{text:"Permanecem altos",correct:false},{text:"Diminuem bastante",correct:true},{text:"Permanecem constantes",correct:false}]},
    {question:"Qual é o nome do processo que ocorre quando o espermatozoide penetra o óvulo?",answers:[
      {text:"Ovulação",correct:false},{text:"Fecundação",correct:true},{text:"Nidação",correct:false},{text:"Implantação",correct:false}]},
    {question:"O que é a nidação?",answers:[
      {text:"A liberação do óvulo",correct:false},{text:"A penetração do espermatozoide no óvulo",correct:false},{text:"A fixação do embrião no endométrio",correct:true},{text:"A expulsão do endométrio",correct:false}]}
  ];

  const allQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];

  // ---------- EVENTOS ----------
  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", nextQuestionAnimated);
  restartBtn.addEventListener("click", restartQuiz);
  backBtn.addEventListener("click", goBackHome);

  function startQuiz() {
    homeScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  }

  function showQuestion() {
    resetState();
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    questionText.style.opacity = 0;
    answerButtons.style.opacity = 0;

    setTimeout(() => {
      questionText.textContent = currentQuestion.question;
      currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = answer.text;
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answerButtons.appendChild(button);
      });
      questionText.style.opacity = 1;
      answerButtons.style.opacity = 1;
    }, 200);
  }

  function resetState() {
    nextBtn.classList.add("hidden");
    answerButtons.innerHTML = "";
  }

  function selectAnswer(button, correct) {
    const buttons = answerButtons.querySelectorAll(".btn");
    buttons.forEach(btn => btn.disabled = true);

    if (correct) button.classList.add("correct");
    else button.classList.add("wrong");

    button.classList.add("glow");
    setTimeout(() => button.classList.remove("glow"), 400);

    nextBtn.classList.remove("hidden");
    if (correct) score++;
  }

  function nextQuestionAnimated() {
    questionText.style.opacity = 0;
    answerButtons.style.opacity = 0;
    nextBtn.classList.add("hidden");

    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < shuffledQuestions.length) showQuestion();
      else endQuiz();
    }, 250);
  }

  function endQuiz() {
    quizScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    scoreText.textContent = `Você acertou ${score} de ${shuffledQuestions.length} perguntas! 💗`;
  }

  function restartQuiz() {
    endScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
    score = 0;
  }

  function goBackHome() {
    quizScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
    score = 0;
  }
});
