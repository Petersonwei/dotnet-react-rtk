var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// remove this, not needed for now, it is the alternative of swagger
// builder.Services.AddOpenApi(); 

var app = builder.Build();

// Configure the HTTP request pipeline.

// remove this for now, will be used in future
// if (app.Environment.IsDevelopment())
// {
//     app.MapOpenApi();
// }

// app.UseHttpsRedirection();

// app.UseAuthorization();

app.MapControllers();

app.Run();
