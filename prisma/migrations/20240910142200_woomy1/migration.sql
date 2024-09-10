-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "ubi" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paseador" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "ubi" TEXT NOT NULL,

    CONSTRAINT "Paseador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paseo" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL,
    "mascota" TEXT NOT NULL,
    "idPaseador" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Paseo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Paseador_correo_key" ON "Paseador"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Paseador_cedula_key" ON "Paseador"("cedula");

-- AddForeignKey
ALTER TABLE "Paseo" ADD CONSTRAINT "Paseo_idPaseador_fkey" FOREIGN KEY ("idPaseador") REFERENCES "Paseador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paseo" ADD CONSTRAINT "Paseo_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
