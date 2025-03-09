using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context) : BaseApiController
{
    [HttpGet]
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
        // Get basket
        // Create basket
        // Get product
        // Add item to basket
        // Save changes
        return StatusCode(201);
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        // Get basket
        // Remove item from basket or reduce quantity
        // Save changes
        return Ok();
    }
}
