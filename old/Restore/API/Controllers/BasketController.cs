using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context) : BaseApiController
{
    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<Basket>> GetBasket()
    {
        var basket = await context.Baskets
            .Include(i => i.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["buyerId"]);

        if (basket == null) return NoContent();

        return basket;
    }

    [HttpPost]
    public async Task<ActionResult<Basket>> AddItemToBasket(int productId, int quantity)
    {
        // Get basket or create one
        var basket = await RetrieveBasket();
        if (basket == null) basket = CreateBasket();

        // Get product
        var product = await context.Products.FindAsync(productId);
        if (product == null) return NotFound();

        // Add item to basket
        basket.AddItem(product, quantity);

        // Save changes
        var result = await context.SaveChangesAsync() > 0;
        if (result) return CreatedAtRoute("GetBasket", basket);

        return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        // Get basket
        var basket = await RetrieveBasket();
        if (basket == null) return NotFound();

        // Remove item from basket or reduce quantity
        basket.RemoveItem(productId, quantity);

        // Save changes
        var result = await context.SaveChangesAsync() > 0;
        if (result) return Ok();

        return BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });
    }

    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(i => i.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["buyerId"]);
    }

    private Basket CreateBasket()
    {
        var buyerId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions 
        { 
            IsEssential = true, 
            Expires = DateTime.Now.AddDays(30),
            HttpOnly = false,
            Secure = false,
            SameSite = SameSiteMode.Lax
        };
        Response.Cookies.Append("buyerId", buyerId, cookieOptions);

        var basket = new Basket { BasketId = buyerId };
        context.Baskets.Add(basket);
        return basket;
    }
}
