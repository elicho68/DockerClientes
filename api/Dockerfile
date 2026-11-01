# Etapa 1: Compilación con SDK .NET 10
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["ClientesAPI.csproj", "./"]
RUN dotnet restore "ClientesAPI.csproj"

COPY . .
RUN dotnet publish "ClientesAPI.csproj" -c Release -o /app/publish --no-restore

# Etapa 2: Ejecución con ASP.NET Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "ClientesAPI.dll"]
