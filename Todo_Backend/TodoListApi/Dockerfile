# Use the official .NET 6 SDK image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Use the SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Todo_Backend/TodoListApi/TodoListApi.csproj", "Todo_Backend/TodoListApi/"]
RUN dotnet restore "Todo_Backend/TodoListApi/TodoListApi.csproj"
COPY . .
WORKDIR "/src/Todo_Backend/TodoListApi"
RUN dotnet build "TodoListApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TodoListApi.csproj" -c Release -o /app/publish

# Use the base image to run the app
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TodoListApi.dll"]
