from fastapi import FastAPI
from config import APP_NAME, API_PREFIX
from api.routes import api_router

# Initialize the FastAPI app
app = FastAPI(title=APP_NAME)

@app.get("/", tags=["Health Check"])
def read_root():
    """
    Root endpoint to check if the API is running.
    """
    return {"status": "ok", "message": f"Welcome to {APP_NAME}"}


# You can later mount routers here
# from .api.v1 import api_router
app.include_router(api_router, prefix=API_PREFIX)

if __name__ == "__main__":
    import uvicorn
    # This block is for local development
    # Use Gunicorn or another ASGI server in production
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)