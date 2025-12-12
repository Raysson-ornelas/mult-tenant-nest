# Estratégia de Testes — Plano Estruturado

## Curto Prazo (1–3 semanas) — **Lógica de Negócio e Segurança**

Nesta fase, o foco é garantir que a lógica central da aplicação funcione corretamente. O retorno sobre o tempo investido aqui é muito alto.

### 1. Segurança Essencial e Preparação da API
- Implementar **helmet**, **CORS**, **rate-limiting**, **ValidationPipe**.  
- Configurar **@nestjs/swagger** e **@nestjs/config**.

### 2. Testes da Lógica de Negócio (Unit Tests)
- **O que testar:** Services (`*.service.ts`) — onde estão as regras de negócio.  
- **Tipo de teste:** Testes de Unidade.  
- **Motivo:** Rápidos, precisos e independentes de banco de dados.  
- **Dicas práticas:**
  - Priorize `user.service.ts`, `parking-lot.service.ts` e `parking-record.service.ts`.
  - Mocke o `PrismaService`, definindo retornos esperados (ex.: `prisma.user.findUnique`).
  - Valide cenários felizes e principais cenários de erro.

---

## Médio Prazo (1–3 meses) — **Integração e Fluxos do Usuário**

Com os serviços validados, o objetivo é garantir que os fluxos completos funcionem ponta a ponta.

### 1. Deploy (CI/CD), Autorização (RBAC) e Logging
Conforme definido anteriormente.

### 2. Testes de Integração / End-to-End (E2E)
- **O que testar:** Fluxos críticos passando pelos Controllers.  
- **Tipo de teste:** Testes E2E.  
- **Motivo:** Simulam requisições reais, validando integração entre todas as camadas.  
- **Dicas práticas:**
  - Use o template padrão do NestJS em `/test` com **supertest**.
  - Configure um **banco exclusivo** para testes (Docker Compose é ideal).
  - Comece pelo fluxo mais importante, como: **cadastro → login**.

---

## Longo Prazo (3+ meses) — **Robustez e Cobertura Completa**

Fase para fortalecer a cobertura e testar componentes específicos.

### 1. Observabilidade, Otimização e Segurança Avançada
Conforme especificado previamente.

### 2. Aumento da Cobertura de Testes
- **O que testar:** Guards, Pipes, Interceptors, lógica dos Controllers.  
- **Tipo de teste:** Testes de Unidade específicos.  
- **Motivo:** Aumentar robustez e encontrar casos de borda.  
- **Dicas práticas:**
  - Teste componentes como `AuthGuard` e `RolesGuard` mockando `ExecutionContext`.
  - Use **code coverage** (`npm run test:cov`) para encontrar lacunas relevantes.

---

## Resumo da Estratégia

- **Agora (Curto Prazo):** Foque principalmente em **unit tests dos Services**.  
- **Em Breve (Médio Prazo):** Crie **testes E2E** para os fluxos essenciais, com banco de teste isolado.  
- **Depois (Longo Prazo):** Cubra componentes menores com **testes de unidade adicionais**.
