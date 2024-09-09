from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
import logging

logger = logging.getLogger(__name__) #error_logging

class BaseChartView(APIView):
    def handle_exception(self, exc):
        logger.error(f"An error occurred: {str(exc)}")
        if isinstance(exc, ValidationError):
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CandlestickDataView(BaseChartView):
    def get(self, request):
        try:
            data = [
                {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
                {"x": "2023-01-02", "open": 40, "high": 45, "low": 30, "close": 40},
                {"x": "2023-01-03", "open": 45, "high": 50, "low": 35, "close": 35},
            ]
            return Response({"data": data})
        except Exception as e:
            return self.handle_exception(e)

class LineChartDataView(BaseChartView):
    def get(self, request):
        try:
            data = {
                "labels": ["Jan", "Feb", "Mar", "Apr"],
                "data": [4, 40, 22, 34]
            }
            return Response(data)
        except Exception as e:
            return self.handle_exception(e)

class BarChartDataView(BaseChartView):
    def get(self, request):
        try:
            data = {
                "labels": ["Product A", "Product B", "Product C"],
                "data": [230, 150, 200]
            }
            return Response(data)
        except Exception as e:
            return self.handle_exception(e)

class PieChartDataView(BaseChartView):
    def get(self, request):
        try:
            data = {
                "labels": ["Red", "Blue", "Yellow"],
                "data": [300, 50, 100]
            }
            return Response(data)
        except Exception as e:
            return self.handle_exception(e)