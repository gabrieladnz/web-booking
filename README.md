
# 🏨 JalaBooking

> Sistema completo de reservas de hotéis com arquitetura moderna e escalável

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0-red)](https://nestjs.com/)
[![Angular](https://img.shields.io/badge/Angular-17-red)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

---

## 📋 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Estrutura do Banco de Dados](#-estrutura-do-banco-de-dados)
- [API Reference](#-api-reference)
- [Instalação](#-instalação)

---

## 🎯 Sobre o projeto

O **JalaBooking** é uma plataforma moderna de reservas hoteleiras que oferece uma experiência completa tanto para hóspedes quanto para gestores de hotéis. O sistema foi projetado com foco em escalabilidade, segurança e performance, implementando as melhores práticas de desenvolvimento de software.

### Diferenciais

- **Gestão Precisa de Inventário**: Distinção clara entre tipos de quarto e quartos físicos individuais.
- **Sistema Anti-Overbooking**: Transações atômicas com bloqueios pessimistas.
- **Segurança Robusta**: Autenticação JWT com rotação de refresh tokens.
- **Arquitetura Extensível**: Preparado para funcionalidades futuras (RBAC, painel admin).
- **Política de Cancelamento Inteligente**: Regras de negócio aplicadas no backend.

---

## ✨ Funcionalidades

### Para hóspedes

- ✅ Cadastro e autenticação segura de usuários.
- 🔍 Busca avançada de hotéis por localização, datas e capacidade.
- 🏷️ Filtros de preço e ordenação de resultados.
- 📅 Criação de reservas com verificação de disponibilidade em tempo real.
- 📋 Visualização do histórico de reservas (futuras e passadas).
- ❌ Cancelamento de reservas com política automática (gratuito até 3 dias antes).
- 👤 Gestão de perfil pessoal.

### Para o sistema

- 🔐 Controle de acesso baseado em funções (RBAC ready).
- 🛡️ Proteção contra race conditions na criação de reservas.
- 🔄 Refresh token rotation para segurança aprimorada.
- 📊 Sistema de disponibilidade computada dinamicamente.
- 🗄️ Modelo de dados normalizado e otimizado.

---

## 🏗️ Arquitetura

### Arquitetura em camadas

```plaintext
┌─────────────────────────────────────┐
│      Frontend (Angular + Viun)     │
│  - Components  - Services  - Guards │
└─────────────┬───────────────────────┘
			  │ REST API
┌─────────────▼───────────────────────┐
│         NestJS Backend              │
├─────────────────────────────────────┤
│      Controllers Layer              │
│  - Decorators  - DTOs  - Pipes      │
├─────────────────────────────────────┤
│      Services Layer                 │
│  - Business Logic  - Validators     │
├─────────────────────────────────────┤
│      Repository Layer               │
│  - Prisma ORM  - Entities           │
├─────────────────────────────────────┤
│         Database Layer              │
│  PostgreSQL / MySQL                 │
└─────────────────────────────────────┘
```

### Modelo de dados (MER)

```plaintext
User (1) ──────< (N) Booking
					 │
Hotel (1) ───< (N) RoomType (1) ───< (N) Room
										  │
										  └──< (1) Booking
```

**Decisão Arquitetônica crítica**: A separação entre `RoomType` (categoria abstrata) e `Room` (unidade física) permite gestão precisa de inventário e previne overbooking.

---

## 🛠️ Tecnologias

### Backend

- **Framework**: NestJS 10+
- **Runtime**: Node.js (≥18.0.0)
- **Linguagem**: TypeScript 5+
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL (recomendado) / MySQL
- **Autenticação**: @nestjs/jwt + @nestjs/passport
- **Criptografia**: bcrypt
- **Validação**: class-validator + class-transformer
- **Documentação**: @nestjs/swagger (OpenAPI)
- **Testes**: Jest + Supertest
- **Config Management**: @nestjs/config

### Frontend

- **Framework**: Angular 17+
- **Linguagem**: TypeScript 5+
- **State Management**: RxJS + Services
- **Roteamento**: Angular Router
- **Requisições HTTP**: HttpClient (Angular)
- **Formulários**: Reactive Forms
- **Validação**: Validators personalizados
- **Estilização**: SCSS + Angular Material (opcional)
- **Testes**: Jasmine + Karma

---

## 🗄️ Estrutura do banco de dados

### Tabela: Users

```sql
CREATE TABLE Users (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	firstName VARCHAR(100) NOT NULL,
	lastName VARCHAR(100) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	birthDate DATE NOT NULL,
	role VARCHAR(50) NOT NULL DEFAULT 'USER',
	createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
	updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Tabela: Hotels

```sql
CREATE TABLE Hotels (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name VARCHAR(255) NOT NULL,
	address VARCHAR(255) NOT NULL,
	city VARCHAR(100) NOT NULL,
	country VARCHAR(100) NOT NULL,
	description TEXT,
	imageUrl VARCHAR(255),
	rating DECIMAL(2,1)
);

CREATE INDEX idx_hotels_city ON Hotels(city);
```

### Tabela: RoomTypes

```sql
CREATE TABLE RoomTypes (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	hotelId UUID NOT NULL REFERENCES Hotels(id) ON DELETE CASCADE,
	name VARCHAR(100) NOT NULL,
	description TEXT,
	capacity INT NOT NULL,
	basePricePerNight DECIMAL(10,2) NOT NULL
);
```

### Tabela: Rooms

```sql
CREATE TABLE Rooms (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	roomTypeId UUID NOT NULL REFERENCES RoomTypes(id) ON DELETE CASCADE,
	roomNumber VARCHAR(20) NOT NULL,
	status VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE'
);
```

### Tabela: Bookings

```sql
CREATE TABLE Bookings (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	userId UUID NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
	roomId UUID NOT NULL REFERENCES Rooms(id) ON DELETE CASCADE,
	checkInDate DATE NOT NULL,
	checkOutDate DATE NOT NULL,
	totalPrice DECIMAL(10,2) NOT NULL,
	status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
	createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_dates ON Bookings(checkInDate, checkOutDate);
```

---

## 🚀 Instalação

### Pré-requisitos

- Node.js (≥18.0.0)
- PostgreSQL (≥14.0) ou MySQL (≥8.0)
- npm ou pnpm
- Angular CLI (`npm install -g @angular/cli`)
- NestJS CLI (`npm install -g @nestjs/cli`)
- Git

