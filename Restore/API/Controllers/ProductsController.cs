using API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restore.API.Entities;

namespace API.Controllers
{
    [Route("api/[controller]")] // https://localhost:5001/api/products
    [ApiController]
    public class ProductsController(StoreContext context) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await context.Products.ToListAsync();
        }

        [HttpGet("{id}")] // api/products/1
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }
    }
}
