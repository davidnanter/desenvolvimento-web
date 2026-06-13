import type { Handler, HandlerEvent } from "@netlify/functions";
import nodemailer from "nodemailer";

// Interface que define o formato de dados que o formulário do React vai enviar
interface ContactPayload {
  email: string;
  message: string;
}

// Configuração de CORS para permitir que o frontend converse com o backend
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? "";

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN || origin,
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
});

// O Handler é a esteira de produção principal da Function
const handler: Handler = async (event: HandlerEvent) => {
  const origin = event.headers["origin"] ?? "";

  // 1. Tratamento do método OPTIONS (Preflight do navegador)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders(origin),
      body: "",
    };
  }

  // 2. Bloqueia qualquer método que não seja POST (Segurança de Rotas)
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Método não permitido." }),
    };
  }

  // 3. Leitura e conversão do texto bruto do corpo da requisição (Body)
  let payload: ContactPayload;
  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Body inválido." }),
    };
  }

  const { email, message } = payload;

  // 4. Princípio da Confiança Zero: Validação rigorosa dos campos no servidor
  if (!email?.trim() || !message?.trim()) {
    return {
      statusCode: 422,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Campos obrigatórios: email, message." }),
    };
  }

  // Expressão Regular (Regex) para checar se o formato do e-mail é válido
  const emailRegex = /^[^ \s@]+@[^ \s@]+\.[^ \s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 422,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "E-mail inválido." }),
    };
  }

  // 5. Configuração do transporte SMTP usando as credenciais do cofre (.env)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // 6. Bloco Try/Catch para o envio definitivo do e-mail formatado em HTML
  try {
    await transporter.sendMail({
      from: `<${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL,
      subject: "[EliteDraft] Nova mensagem da Landing Page",
      text: message,
      html: `
        <h2>Nova mensagem de contato recebida</h2>
        <p><strong>E-mail do remetente:</strong> ${email}</p>
        <p><strong>Mensagem enviada:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Retorno de Sucesso absoluto
    return {
      statusCode: 200,
      headers: corsHeaders(origin),
      body: JSON.stringify({ message: "E-mail enviado com sucesso." }),
    };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return {
      statusCode: 500,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Falha ao enviar o e-mail. Tente novamente mais tarde." }),
    };
  }
};

export { handler };